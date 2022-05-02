import { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const storeName = 'new store'
export const updateStoreName = `${storeName} updated`
export const parentStoreName = 'Parent store'

export const parentStoreInput = (ownerId: string): StoreCreateInput => ({
  name: parentStoreName,
  localState: '{}',
  actions: {},
  children: {},
  parentStore: {},
  resources: {},
  state: {
    create: {
      node: {
        name: 'Test Store API',
        kind: ITypeKind.InterfaceType,
        id: v4(),
        fields: {},
        fieldsFor: {},
        apiOfAtoms: {},
        owner: { connect: { where: { node: { auth0Id: ownerId } } } },
      },
    },
  },
})
