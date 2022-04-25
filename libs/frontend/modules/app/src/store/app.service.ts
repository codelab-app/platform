import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AppWhere } from '@codelab/shared/abstract/codegen'
import {
  IAppService,
  ICreateAppDTO,
  IUpdateAppDTO,
} from '@codelab/shared/abstract/core'
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
    return this.apps.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    return apps.map((app) => {
      if (this.apps.has(app.id)) {
        return throwIfUndefined(this.apps.get(app.id))
      }

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
  create = _async(function* (this: AppService, input: ICreateAppDTO) {
    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input: {
          name: input.name,
          owner: { connect: { where: { node: { auth0Id: input.auth0Id } } } },
          store: input.storeId
            ? { connect: { where: { node: { id: input.storeId } } } }
            : undefined,
          rootProviderElement: {
            create: { node: { name: PROVIDER_ROOT_ELEMENT_NAME } },
          },
        },
      }),
    )

    const app = apps[0]

    if (!app) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('App was not created')
    }

    const appModel = App.hydrate(app)

    this.apps.set(appModel.id, appModel)

    return appModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, id: string) {
    const existing = throwIfUndefined(this.apps.get(id))

    if (existing) {
      this.apps.delete(id)
    }

    const { deleteApps } = yield* _await(appApi.DeleteApps({ where: { id } }))

    if (deleteApps.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return existing
  })
}
