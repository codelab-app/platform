import type { IRef, IStoreDto } from '@codelab/shared/abstract/core'
import type {
  StoreOptions,
  StoreUniqueWhere,
  StoreWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IStoreRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'
import {
  storeMapper,
  storeServerActions,
} from '@codelab/shared-domain-module/store'
import { withTracingMethods } from '@codelab/shared-infra-sentry'
import { revalidateTag } from 'next/cache'

const { CreateStores, DeleteStores, GetStores, UpdateStores } =
  await storeServerActions()

export const storeRepository: IStoreRepository = withTracingMethods('store', {
  add: async (input: IStoreDto) => {
    const {
      createStores: { stores },
    } = await CreateStores({
      input: storeMapper.toCreateInput(input),
    })

    const createdStore = stores[0]

    Validator.assertsDefined(createdStore)

    return createdStore
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteStores: { nodesDeleted },
    } = await DeleteStores({
      delete: storeMapper.toDeleteInput(),
      where: { id_IN: refs.map(({ id }) => id) },
    })

    return nodesDeleted
  },

  find: async (where?: StoreWhere, options?: StoreOptions) => {
    return await GetStores(
      { options, where },
      { tags: [CACHE_TAGS.STORE_LIST] },
    )
  },

  findOne: async (where: StoreUniqueWhere) => {
    return (await storeRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, input: IStoreDto) => {
    const {
      updateStores: { stores },
    } = await UpdateStores({
      update: storeMapper.toUpdateInput(input),
      where: { id },
    })

    const updatedStore = stores[0]

    Validator.assertsDefined(updatedStore)

    return updatedStore
  },
})

export const invalidateStoreListQuery = () =>
  revalidateTag(CACHE_TAGS.STORE_LIST)
