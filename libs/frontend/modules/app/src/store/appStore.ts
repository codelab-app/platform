import { ModalStore } from '@codelab/frontend/shared/utils'
import { AppWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  addMiddleware,
  flow,
  Instance,
  toGenerator,
  types,
} from 'mobx-state-tree'
import { atomic } from 'mst-middlewares'
import type { CreateAppInput } from '../use-cases/create-app/createAppSchema'
import type { UpdateAppInput } from '../use-cases/update-app/updateAppSchema'
import { appApi } from './appApi'

console.log({ ModalStore })

export const AppModel = types
  .model({
    id: types.identifier,
    ownerId: types.optional(types.maybeNull(types.string), null),
    name: types.string,
    rootProviderElement: types.maybeNull(
      types.model({
        id: types.string,
      }),
    ),
  })
  .actions((self) => {
    // This middleware rolls back if a synchronous or asynchronous action process fails.
    addMiddleware(self, atomic)

    return {
      update: flow(function* ({ name }: UpdateAppInput) {
        self.name = name

        const { updateApps } = yield* toGenerator(
          appApi.UpdateApps({
            update: { name },
            where: { id: self.id },
          }),
        )

        const app = updateApps?.apps[0]

        if (!app) {
          throw new Error('Failed to update app')
        }

        self.name = app.name

        return app
      }),
    }
  })

export type AppModel = Instance<typeof AppModel>

const AppModalStore = ModalStore.named('AppModal')
  .props({
    app: types.optional(types.maybeNull(types.safeReference(AppModel)), null),
  })
  .actions((self) => {
    const superOpen = self.open
    const superClose = self.close

    return {
      open: (appId: string) => {
        superOpen()
        self.app = appId as any
      },
      close: () => {
        superClose()
        self.app = null
      },
    }
  })

export const AppStore = types
  .model({
    apps: types.map(AppModel),

    deleteModal: AppModalStore,
    updateModal: AppModalStore,
    createModal: ModalStore,
  })
  .views((self) => ({
    get appsList() {
      return [...self.apps.values()]
    },

    app(id: string) {
      return self.apps.get(id)
    },
  }))
  .actions((self) => {
    addMiddleware(self, atomic)

    return {
      getAll: flow(function* (where?: AppWhere) {
        const { apps } = yield* toGenerator(appApi.GetApps({ where }))

        const appModels = apps.map((app) =>
          AppModel.create({
            ...app,
            ownerId: app.owner?.[0]?.id,
          }),
        )

        for (const app of appModels) {
          self.apps.put(app)
        }

        return appModels
      }),
    }
  })
  .actions((self) => ({
    getOne: flow(function* (id: string) {
      if (self.apps.has(id)) {
        return self.apps.get(id)
      }

      const all = yield* toGenerator(self.getAll({ id }))

      return all[0]
    }),
  }))
  .actions((self) => ({
    createApp: flow(function* (
      input: CreateAppInput,
      ownerId: Nullish<string>,
    ) {
      // Store it in the database
      const {
        createApps: { apps },
      } = yield* toGenerator(
        appApi.CreateApps({
          input: {
            ...input,
            owner: {
              connect: [{ where: { node: { auth0Id: ownerId } } }],
            },
            rootProviderElement: {
              create: {
                node: {
                  name: 'Provider Root Element',
                },
              },
            },
          },
        }),
      )

      const app = apps[0]

      if (!app) {
        // Throw an error so that the atomic middleware rolls back the changes
        throw new Error('App was not created')
      }

      const appModel = AppModel.create(app)

      self.apps.put(appModel)

      return appModel
    }),

    deleteApp: flow(function* (id: string) {
      if (self.apps.has(id)) {
        self.apps.delete(id)
      }

      const { deleteApps } = yield* toGenerator(
        appApi.DeleteApps({ where: { id } }),
      )

      if (deleteApps.nodesDeleted === 0) {
        // throw error so that the atomic middleware rolls back the changes
        throw new Error('App was not deleted')
      }

      return deleteApps
    }),
  }))

export type AppStore = Instance<typeof AppStore>
