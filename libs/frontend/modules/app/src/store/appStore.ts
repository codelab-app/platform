import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalStore } from '@codelab/frontend/shared/utils'
import { AppWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { AppFragment } from '../graphql/App.fragment.v2.1.graphql.gen'
import type { CreateAppInput } from '../use-cases/create-app/createAppSchema'
import type { UpdateAppInput } from '../use-cases/update-app/updateAppSchema'
import { appApi } from './appApi'

@model('codelab/App')
export class AppModel extends Model({
  id: idProp,
  ownerId: prop<Nullish<string>>(),
  name: prop<string>(),
  rootProviderElement: prop<Nullish<{ id: string }>>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (this: AppModel, { name }: UpdateAppInput) {
    this.name = name

    const { updateApps } = yield* _await(
      appApi.UpdateApps({
        update: { name },
        where: { id: this.id },
      }),
    )

    const app = updateApps?.apps[0]

    if (!app) {
      throw new Error('Failed to update app')
    }

    this.name = app.name

    return app
  })

  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static fromFragment(app: AppFragment) {
    return new AppModel({
      id: app.id,
      name: app.name,
      ownerId: app.owner?.[0]?.id,
      rootProviderElement: { id: app.rootProviderElement.id },
    })
  }
}

export const appRef = rootRef<AppModel>('AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})

@model('codelab/AppModalStore')
class AppModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Ref<AppModel>>>(ModalStore),
  props: {},
})) {
  @computed
  get app() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/AppStore')
export class AppStore extends Model({
  apps: prop(() => objectMap<AppModel>()),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new AppModalStore({})),
  deleteModal: prop(() => new AppModalStore({})),
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
  getAll = _async(function* (this: AppStore, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    return apps.map((app) => {
      if (this.apps.get(app.id)) {
        return this.apps.get(app.id)
      } else {
        const appModel = AppModel.fromFragment(app)
        this.apps.set(app.id, appModel)

        return appModel
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AppStore, id: string) {
    if (this.apps.has(id)) {
      return this.apps.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  createApp = _async(function* (
    this: AppStore,
    input: CreateAppInput,
    ownerId: Nullish<string>,
  ) {
    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input: {
          ...input,
          owner: {
            connect: [{ where: { node: { auth0Id: ownerId } } }],
          },
          rootProviderElement: {
            create: {
              node: {
                name: PROVIDER_ROOT_ELEMENT_NAME,
              },
            },
          },
        },
      }),
    )

    const app = apps[0]

    if (!app) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('App was not created')
    }

    const appModel = AppModel.fromFragment(app)

    this.apps.set(appModel.id, appModel)

    return appModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppStore, id: string) {
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
