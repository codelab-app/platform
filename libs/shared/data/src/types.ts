import {
  ICreateTypeDTO,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createPrimitiveTypesData: Array<Omit<ICreateTypeDTO, 'auth0Id'>> =
  [
    {
      id: v4(),
      name: IPrimitiveTypeKind.String,
      kind: ITypeKind.PrimitiveType,
      primitiveKind: IPrimitiveTypeKind.String,
    },
    {
      id: v4(),
      name: IPrimitiveTypeKind.Boolean,
      kind: ITypeKind.PrimitiveType,
      primitiveKind: IPrimitiveTypeKind.Boolean,
    },
    {
      id: v4(),
      name: IPrimitiveTypeKind.Float,
      kind: ITypeKind.PrimitiveType,
      primitiveKind: IPrimitiveTypeKind.Float,
    },
    {
      id: v4(),
      name: IPrimitiveTypeKind.Integer,
      kind: ITypeKind.PrimitiveType,
      primitiveKind: IPrimitiveTypeKind.Integer,
    },
  ]
