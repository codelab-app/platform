import type {
  ExistingData,
  IInterfaceTypeExport,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { antdAtomData, getApiName, reactAtomData } from '@codelab/shared/data'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

/**
 * We need to create interface separately, our atom creation logic only links to existing interfaces
 */
export const createApiData = (
  data: ExistingData,
): Array<IInterfaceTypeExport> => {
  const atomsData = { ...antdAtomData, ...reactAtomData }

  return ObjectTyped.keys(atomsData).map((name) => {
    const atomApiId = data.api[getApiName(name)]?.id ?? v4()

    return {
      __typename: ITypeKind.InterfaceType,
      id: atomApiId,
      name: getApiName(name),
      kind: ITypeKind.InterfaceType,
      fields: [],
    }
  })
}
