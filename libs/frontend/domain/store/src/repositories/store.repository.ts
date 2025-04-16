import type { IRef, IStoreDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type { StoreOptions, StoreWhere } from '@codelab/shared-infra-gqlgen'

import { type IStoreRepository } from '@codelab/frontend-abstract-domain'
import {
  storeMapper,
  storeServerActions,
} from '@codelab/shared-domain-module-store'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateStores, DeleteStores, GetStores, UpdateStores } =
  storeServerActions

export const storeRepository: IStoreRepository = {
  add: async (input: IStoreDto, next?: NextFetchOptions) => {
    const {
      createStores: { stores },
    } = await CreateStores(
      {
        input: storeMapper.toCreateInput(input),
      },
      next,
    )

    const createdStore = stores[0]

    Validator.assertsDefined(createdStore)

    return createdStore
  },

  delete: async (refs: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteStores: { nodesDeleted },
    } = await DeleteStores(
      {
        delete: storeMapper.toDeleteInput(),
        where: { id_IN: refs.map(({ id }) => id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: StoreWhere,
    options?: StoreOptions,
    next?: NextFetchOptions,
  ) => {
    return await GetStores({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: StoreWhere, next?: NextFetchOptions) => {
    return (await storeRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, input: IStoreDto, next?: NextFetchOptions) => {
    const {
      updateStores: { stores },
    } = await UpdateStores(
      {
        update: storeMapper.toUpdateInput(input),
        where: { id },
      },
      next,
    )

    const updatedStore = stores[0]

    Validator.assertsDefined(updatedStore)

    return updatedStore
  },
}
