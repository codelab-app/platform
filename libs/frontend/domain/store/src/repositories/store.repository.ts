import type {
  IStoreModel,
  IStoreRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  StoreOptions,
  StoreUniqueWhere,
  StoreWhere,
} from '@codelab/shared/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { Store } from '../store/store.model'
import {
  CreateStores,
  DeleteStores,
  GetStores,
  UpdateStores,
} from './store.api.graphql.gen'

export const storeRepository: IStoreRepository = {
  add: async (store: IStoreModel) => {
    const {
      createStores: { stores },
    } = await CreateStores({
      input: [store.toCreateInput()],
    })

    const createdStore = stores[0]

    assertIsDefined(createdStore)

    return createdStore
  },

  delete: async (stores: Array<IStoreModel>) => {
    const {
      deleteStores: { nodesDeleted },
    } = await DeleteStores({
      delete: Store.toDeleteInput(),
      where: { id_IN: stores.map((store) => store.id) },
    })

    return nodesDeleted
  },

  find: async (where?: StoreWhere, options?: StoreOptions) => {
    return await GetStores({ options, where })
  },

  findOne: async (where: StoreUniqueWhere) => {
    return (await storeRepository.find(where)).items[0]
  },

  update: async (store: IStoreModel) => {
    const {
      updateStores: { stores },
    } = await UpdateStores({
      update: store.toUpdateInput(),
      where: { id: store.id },
    })

    const updatedStore = stores[0]

    assertIsDefined(updatedStore)

    return updatedStore
  },
}
