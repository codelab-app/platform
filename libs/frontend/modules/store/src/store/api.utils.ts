//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { ICreateStoreDTO, IUpdateStoreDTO } from '@codelab/shared/abstract/core'
import { capitalize } from 'lodash'
import { v4 } from 'uuid'
import { CreateStoreInput, UpdateStoreInput } from '../use-cases'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
  ownerId: string,
): StoreCreateInput => {
  const { name, parentStore } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: {
      connect: { where: { node: { auth0Id: ownerId } } },
    },
  }

  return {
    name,
    parentStore: {
      connect: parentStore?.id
        ? {
            where: { node: { id: parentStore.id } },
            edge: { storeKey: parentStore.key },
          }
        : null,
    },
    initialState: '{}',
    state: { create: { node: interfaceCreateInput } },
  }
}

export const makeStoreUpdateInput = (
  input: IUpdateStoreDTO,
): StoreUpdateInput => {
  const { name, parentStore, initialState } = input

  return {
    name,
    initialState,
    parentStore: {
      disconnect: { where: {} },
      connect: parentStore?.id
        ? {
            where: { node: { id: parentStore.id } },
            edge: { storeKey: parentStore.key },
          }
        : null,
    },
  }
}
