//
// Utilities for transforming the form inputs to api inputs
//

import {
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen-v2'
import { CreateStoreInput, UpdateStoreInput } from '../use-cases'

export const makeStoreCreateInput = (
  input: CreateStoreInput,
): StoreCreateInput => {
  const { name, parentStore } = input

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
  }
}

export const makeStoreUpdateInput = (
  input: UpdateStoreInput,
): StoreUpdateInput => {
  const { name, parentStore } = input

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
  }
}
