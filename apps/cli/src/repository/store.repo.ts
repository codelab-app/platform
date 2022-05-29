import { StoreOGM } from '@codelab/backend'
import { IStoreExport } from '@codelab/shared/abstract/core'

export const createStore = async (
  store: IStoreExport,
  selectedUser: string,
) => {
  const Store = await StoreOGM()

  const {
    stores: [createdStore],
  } = await Store.create({
    input: [
      {
        id: store.id,
        stateApi: { connect: { where: { node: { id: store.stateApi.id } } } },
        name: store.name,
        state: { create: { node: { data: store.state.data } } },
        actions: {
          create: store.actions.map((a) => ({
            node: {
              name: a.name,
              body: a.body,
              config: { create: { node: { data: a.config.data } } },
              resource: a.resource?.id
                ? { connect: { where: { node: { id: a.resource?.id } } } }
                : undefined,
              runOnInit: a.runOnInit,
            },
          })),
        },
      },
    ],
  })

  return createdStore
}
