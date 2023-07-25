import type { IAuth0User, ITypeDTO } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createTypesData = (owner: IAuth0User): Array<ITypeDTO> => [
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    owner,
    primitiveKind: IPrimitiveTypeKind.String,
  },
]
