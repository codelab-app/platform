import {
  ExistingData,
  IInterfaceTypeExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { antdAtomData, getApiName } from '@codelab/shared/data'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

/**
 * We need to create interface separately, our atom creation logic only links to existing interfaces
 */
export const createAntDesignApiData = (
  data: ExistingData,
): Array<IInterfaceTypeExport> => {
  return ObjectTyped.keys(antdAtomData).map((name) => {
    const atomApiId = data.api[getApiName(name)]?.id ?? v4()

    return {
      __typename: ITypeKind.InterfaceType,
      id: atomApiId,
      name: getApiName(name),
      kind: ITypeKind.InterfaceType,
      fieldsConnection: {
        edges: [],
      },
      ownerConnection: {
        edges: [],
      },
    }
  })
}
