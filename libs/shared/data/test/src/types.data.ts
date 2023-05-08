import type { IAuth0Owner, ITypeDTO } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createTypesData = (owner: IAuth0Owner): Array<ITypeDTO> => [
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    owner,
    primitiveKind: IPrimitiveTypeKind.String,
  },
]
