import type { IAuth0User, ITypeDTO } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createTypesData = (): Array<ITypeDTO> => [
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    primitiveKind: IPrimitiveTypeKind.String,
  },
]
