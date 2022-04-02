//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen-v2'
import { capitalize } from 'lodash'
import { CreateStoreInput, UpdateStoreInput } from '../use-cases'

export const makeStoreCreateInput = (
  input: CreateStoreInput,
  ownerId: string,
): StoreCreateInput => {
  const { name, parentStore } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    name: `${capitalize(name)} State`,
    owner: {
      connect: [{ where: { node: { id: ownerId } } }],
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
  input: UpdateStoreInput,
): StoreUpdateInput => {
  const { name, parentStore, initialState } = input

  return {
    name,
    initialState,
    parentStore: {
      connect: parentStore?.id
        ? {
            where: { node: { id: parentStore.id } },
            edge: { storeKey: parentStore.key },
          }
        : null,
    },
  }
}
