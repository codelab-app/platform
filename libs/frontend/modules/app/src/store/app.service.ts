import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { AppWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
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
import type { CreateAppInput } from '../use-cases/create-app/createAppSchema'
import type { UpdateAppInput } from '../use-cases/update-app/updateAppSchema'
import { appApi } from './app.api'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

export type WithAppService = {
  appService: AppService
}

@model('codelab/AppService')
export class AppService extends Model({
  apps: prop(() => objectMap<App>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new AppModalService({})),
  deleteModal: prop(() => new AppModalService({})),
}) {
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
      if (this.apps.get(app.id)) {
        return this.apps.get(app.id)
      } else {
        const appModel = App.fromFragment(app)
        this.apps.set(app.id, appModel)

        return appModel
      }
    })
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AppService,
    app: App,
    { name, storeId }: UpdateAppInput,
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

    const appModel = App.fromFragment(updatedApp)

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
  create = _async(function* (
    this: AppService,
    input: CreateAppInput,
    ownerId: Nullish<string>,
  ) {
    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input: {
          ...input,
          owner: { connect: [{ where: { node: { auth0Id: ownerId } } }] },
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

    const appModel = App.fromFragment(app)

    this.apps.set(appModel.id, appModel)

    return appModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, id: string) {
    if (this.apps.has(id)) {
      this.apps.delete(id)
    }

    const { deleteApps } = yield* _await(appApi.DeleteApps({ where: { id } }))

    if (deleteApps.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('App was not deleted')
    }

    return deleteApps
  })
}
