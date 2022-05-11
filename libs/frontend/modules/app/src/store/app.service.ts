import {
  DETACHED_ROOT_ELEMENT_NAME,
  PROVIDER_ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPageService } from '@codelab/frontend/modules/page'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AppWhere } from '@codelab/shared/abstract/codegen'
import {
  IAppService,
  ICreateAppDTO,
  IUpdateAppDTO,
} from '@codelab/shared/abstract/core'
import { connectId, connectOwner } from '@codelab/shared/data'
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
    app: App,
    { name, storeId }: IUpdateAppDTO,
  ) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: {
          name,
          store: { connect: { where: { node: { id: storeId } } } },
        },
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
    const input = data.map((app) => ({
      id: app.id ?? v4(),
      name: app.name,
      owner: connectOwner(app.auth0Id),
      store: connectId(app.storeId),
      rootProviderElement: {
        create: {
          node: {
            id: v4(),
            name: PROVIDER_ROOT_ELEMENT_NAME,
            owner: connectOwner(app.auth0Id),
          },
        },
      },
      rootDetachedElement: {
        create: {
          node: {
            id: v4(),
            name: DETACHED_ROOT_ELEMENT_NAME,
            owner: connectOwner(app.auth0Id),
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
    const existing = throwIfUndefined(this.apps.get(id))

    if (existing) {
      this.apps.delete(id)

      const elementService = getElementService(this)

      elementService.deleteElementSubgraph(
        existing.rootProviderElement?.id as string,
      )
    }

    const pageService = getPageService(this)

    pageService.deleteManyByAppId(id)

    const deleteCondition = {
      where: {
        id,
      },
      delete: {},
    }

    const { deleteApps } = yield* _await(appApi.DeleteApps(deleteCondition))

    if (deleteApps.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return existing
  })
}
