import { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const storeName = 'new store'
export const updateStoreName = `${storeName} updated`
export const parentStoreName = 'Parent store'

export const parentStoreInput = (ownerId: string): StoreCreateInput => ({
  id: v4(),
  name: parentStoreName,
  actions: {},
  state: {
    create: {
      node: { data: '{}' },
    },
  },
  stateApi: {
    create: {
      node: {
        name: 'Test Store API',
        kind: ITypeKind.InterfaceType,
        id: v4(),
        fields: {},
        apiOfAtoms: {},
        owner: connectOwner(ownerId),
      },
    },
  },
})
