import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

// type CreatePrimitiveTypes = (
//   ids?: Array<string>,
// ) => Array<Omit<ICreateTypeDTO, 'auth0Id'>>

type CreatePrimitiveTypes = (
  ids?: Array<string>,
) => Array<Omit<OGM_TYPES.PrimitiveType, 'owner' | 'ownerConnection'>>

export const buttonInterfaceId = v4()

export const buttonAtomId = v4()

export const stringTypeId = v4()
export const booleanTypeId = v4()
export const floatTypeId = v4()
export const integerTypeId = v4()

export const createPrimitiveTypesData: CreatePrimitiveTypes = ([
  stringId = v4(),
  booleanId = v4(),
  floatId = v4(),
  integerId = v4(),
] = []) => [
  {
    id: stringId,
    name: IPrimitiveTypeKind.String,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.String,
  },
  {
    id: booleanId,
    name: IPrimitiveTypeKind.Boolean,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  },
  {
    id: floatId,
    name: IPrimitiveTypeKind.Float,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Float,
  },
  {
    id: integerId,
    name: IPrimitiveTypeKind.Integer,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Integer,
  },
]
