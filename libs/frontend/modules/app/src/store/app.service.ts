import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import {
  getElementService,
  getStoreService,
} from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AppCreateInput, AppWhere } from '@codelab/shared/abstract/codegen'
import {
  IAppService,
  ICreateAppDTO,
  IUpdateAppDTO,
} from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { appApi } from './app.api'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    apps: prop(() => objectMap<App>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AppModalService({})),
    deleteModal: prop(() => new AppModalService({})),
  })
  implements IAppService
{
  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  app(id: string) {
    return throwIfUndefined(this.apps.get(id))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

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
    { name }: IUpdateAppDTO,
  ) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { name },
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
            stateApi: {
              create: {
                node: {
                  id: v4(),
                  name: `${app.name} Store API`,
                  owner: connectOwner(app.auth0Id),
                },
              },
            },
          },
        },
      },
      rootElement: {
        create: {
          node: {
            id: v4(),
            name: PROVIDER_ROOT_ELEMENT_NAME,
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

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, id: string) {
    const elementService = getElementService(this)
    const storeService = getStoreService(this)
    const app = throwIfUndefined(this.apps.get(id))
    const appRootElement = app.rootElement.id

    const pageRootElements = app.pages.map(
      (page) => page.current.rootElement.id,
    )

    /**
     * Delete all elements from app
     */
    yield* _await(elementService.deleteElementSubgraph(appRootElement))

    yield _await(storeService.delete(app.store?.id))

    /**
     * Delete all elements from all pages
     */
    pageRootElements.forEach(async (root) => {
      await elementService.deleteElementSubgraph(root)
    })

    const { deleteApps } = yield* _await(
      appApi.DeleteApps({
        where: { id },
        delete: {
          pages: [
            {
              where: {},
              delete: {
                rootElement: {},
              },
            },
          ],
          rootElement: {},
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
