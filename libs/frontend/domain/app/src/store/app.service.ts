import {
  IApp,
  IAppDTO,
  IAppService,
  ICreateAppDTO,
  IPageBuilderAppProps,
  IUpdateAppDTO,
} from '@codelab/frontend/abstract/core'
import { getPageService } from '@codelab/frontend/domain/page'
import {
  deleteStoreInput,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService } from '@codelab/frontend/shared/utils'
import { AppCreateInput, AppWhere } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { connectOwner, connectTypeOwner } from '@codelab/shared/data'
import merge from 'lodash/merge'
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
  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @computed
  get appsJson() {
    return this.appsList.map((a) => a.toJson).reduce(merge, {})
  }

  /**
   * Aggregate root method to setup all data invariants
   */
  @modelAction
  load = ({ app, pageId }: IPageBuilderAppProps) => {
    console.debug('AppService.load', app, pageId)

    /**
     * Need to create nested model
     */
    const appModel = this.writeCache(app)

    /**
     * Build the pageElementTree for page
     */
    const pageModels = app.pages.map((page) =>
      this.pageService.writeCache(page),
    )

    const pageModel = pageModels.find((page) => page.id === pageId)
    const page = app.pages.find((x) => x.id === pageId)

    if (!page || !pageModel) {
      throw new Error('Missing page')
    }

    const elements = [page.rootElement, ...page.rootElement.descendantElements]

    const pageElements = elements.map((element) =>
      this.elementService.writeCache(element),
    )

    const rootElement = this.elementService.element(page.rootElement.id)

    if (!rootElement) {
      throw new Error('No root element found')
    }

    const pageElementTree = pageModel.initTree(rootElement, pageElements)

    return {
      pageElementTree,
      app: appModel,
      page: pageModel,
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
    const pages = apps.flatMap((app) => app.pages)

    pages.map((page) => this.pageService.writeCache(page))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    this.updatePagesCache(apps)

    return apps.map((app) => this.writeCache(app))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AppService,
    entity: IEntity,
    { name, slug }: IUpdateAppDTO,
  ) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { name, slug: slugify(slug) },
        where: { id: entity.id },
      }),
    )

    return apps.map((app) => this.writeCache(app))
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

    return apps.map((app) => this.writeCache(app))
  })

  @modelAction
  writeCache = (app: IAppDTO) => {
    let appModel = this.app(app.id)

    if (appModel) {
      appModel.writeCache(app)
    } else {
      appModel = App.hydrate(app)
      this.apps.set(app.id, appModel)
    }

    app.pages.map((page) => this.pageService.writeCache(page))

    return appModel
  }

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, ids: Array<string>) {
    const pageRootElements = ids
      .map((id) => this.apps.get(id))
      .flatMap((app) => app?.pages.map((page) => page.current.rootElement.id))
      .filter((id): id is string => Boolean(id))

    ids.forEach((id) => this.apps.delete(id))

    /**
     * Delete all elements from all pages
     */
    yield* _await(
      Promise.all(
        pageRootElements.map(async (root) => {
          await this.elementService.deleteElementSubgraph(root)
        }),
      ),
    )

    const {
      deleteApps: { nodesDeleted },
    } = yield* _await(
      appApi.DeleteApps({
        where: { id_IN: ids },
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

    return nodesDeleted
  })
}
