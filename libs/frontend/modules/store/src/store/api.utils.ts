//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  IAddStoreResourceDTO,
  ICreateStoreDTO,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
import { capitalize } from 'lodash'
import { v4 } from 'uuid'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
): StoreCreateInput => {
  const { name, parentStore, auth0Id } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: {
      connect: { where: { node: { auth0Id } } },
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
    state: { create: { node: { data: '{}' } } },
    stateApi: { create: { node: interfaceCreateInput } },
  }
}

export const makeStoreUpdateInput = (
  input: IUpdateStoreDTO,
): StoreUpdateInput => {
  const { name, parentStore, state } = input

  return {
    name,
    state: { update: { node: { data: state } }, where: {} },
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

export const makeAddResourceInput = (
  input: IAddStoreResourceDTO,
): StoreUpdateInput => {
  const { key, resourceId } = input

  return {
    resources: [
      {
        connect: [
          {
            where: { node: { id: resourceId } },
            edge: { resourceKey: key },
          },
        ],
      },
    ],
  }
}

export const makeRemoveResourceInput = (
  resourceId: string,
): StoreUpdateInput => ({
  resources: [{ disconnect: [{ where: { node: { id: resourceId } } }] }],
})
