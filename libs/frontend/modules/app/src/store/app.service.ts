import { getPageService } from '@codelab/frontend/modules/page'
import { deleteStoreInput } from '@codelab/frontend/modules/store'
import {
  getElementService,
  getStoreService,
} from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AppCreateInput, AppWhere } from '@codelab/shared/abstract/codegen'
import {
  IApp,
  IAppDTO,
  IAppService,
  ICreateAppDTO,
  IPageBuilderAppProps,
  ITypeKind,
  IUpdateAppDTO,
} from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { connectOwner, connectTypeOwner } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import slugify from 'slugify'
import { v4 } from 'uuid'
import { appApi } from './app.api'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    apps: prop(() => objectMap<IApp>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AppModalService({})),
    deleteModal: prop(() => new AppModalService({})),
  })
  implements IAppService
{
  /**
   * Aggregate root method to setup all data invariants
   */
  @modelAction
  load = ({ app, pageId }: IPageBuilderAppProps) => {
    console.debug('AppService.load', { app, pageId })

    const elementService = getElementService(this)
    const pageService = getPageService(this)
    const storeService = getStoreService(this)
    const storeModel = storeService.writeCache(app.store)
    /**
     * Need to create nested model
     */
    const appModel = this.writeCache(app)
    /**
     * Build the pageElementTree for page
     */
    const pageModels = app.pages.map((page) => pageService.writeCache(page))
    const pageModel = pageModels.find((page) => page.id === pageId)
    const page = app.pages.find((x) => x.id === pageId)

    if (!page || !pageModel) {
      throw new Error('Missing page')
    }

    const elements = [
      page.rootElement,
      ...(page.rootElement.descendantElements ?? []),
    ]

    const pageElements = elements.map((element) =>
      elementService.writeCache(element),
    )

    const pageElementTree = pageModel.initTreeV2(pageElements)

    return {
      pageElementTree,
      app: appModel,
      page: pageModel,
      store: storeModel,
    }
  }

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @modelAction
  private updatePagesCache(apps: Array<IAppDTO>) {
    // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
    const pageService = getPageService(this)
    const pages = apps.flatMap((app) => app.pages)

    pages.map((page) => pageService.writeCache(page))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    this.updatePagesCache(apps)

    return apps.map((app) => {
      const appModel = App.hydrate(app)
      this.apps.set(app.id, appModel)

      return appModel
    })
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AppService,
    app: IEntity,
    { name, slug }: IUpdateAppDTO,
  ) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { name, slug: slugify(slug) },
        where: { id: app.id },
      }),
    )

    const updatedApp = apps[0]

    if (!updatedApp) {
      throw new Error('Failed to update app')
    }

    const appModel = App.hydrate(updatedApp)

    this.apps.set(app.id, appModel)

    return appModel
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AppService, id: string) {
    if (this.apps.has(id)) {
      return this.apps.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (this: AppService, data: Array<ICreateAppDTO>) {
    const input: Array<AppCreateInput> = data.map((app) => ({
      id: app.id ?? v4(),
      name: app.name,
      owner: connectOwner(app.auth0Id),
      slug: slugify(app.slug),
      store: {
        create: {
          node: {
            id: v4(),
            name: `${app.name} Store`,
            state: {
              create: {
                node: { data: '{}' },
              },
            },
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${app.name} Store API`,
                  kind: ITypeKind.InterfaceType,
                  owner: connectTypeOwner(app.auth0Id),
                },
              },
            },
          },
        },
      },
    }))

    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input,
      }),
    )

    if (!apps.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('App was not created')
    }

    return apps.map((app) => {
      const appModel = App.hydrate(app)

      this.apps.set(appModel.id, appModel)

      return appModel
    })
  })

  @modelAction
  writeCache = (app: IAppDTO) => {
    const pageService = getPageService(this)
    let appModel = this.app(app.id)

    if (!appModel) {
      appModel = App.hydrate(app)
    } else {
      appModel = appModel.writeCache(app)
    }

    this.apps.set(app.id, appModel)

    app.pages.map((page) => pageService.writeCache(page))

    return appModel
  }

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, id: string) {
    const elementService = getElementService(this)
    const app = throwIfUndefined(this.apps.get(id))

    const pageRootElements = app.pages.map(
      (page) => page.current.rootElement.id,
    )

    /**
     * Delete all elements from all pages
     */
    yield* _await(
      Promise.all(
        pageRootElements.map(async (root) => {
          await elementService.deleteElementSubgraph(root)
        }),
      ),
    )

    const { deleteApps } = yield* _await(
      appApi.DeleteApps({
        where: { id },
        delete: {
          pages: [
            {
              where: {},
              delete: {},
            },
          ],
          store: {
            where: {},
            delete: deleteStoreInput,
          },
        },
      }),
    )

    if (deleteApps.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    this.apps.delete(id)

    return app
  })
}
