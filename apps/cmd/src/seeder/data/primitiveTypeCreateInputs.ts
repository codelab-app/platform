import { CreateTypeInput } from '@codelab/backend/modules/type'
import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/core'

export const primitiveTypeCreateInputs: Array<CreateTypeInput> = [
  {
    name: PrimitiveTypeKind.String,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.String },
  },
  {
    name: PrimitiveTypeKind.Boolean,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Boolean },
  },
  {
    name: PrimitiveTypeKind.Float,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Float },
  },
  {
    name: PrimitiveTypeKind.Integer,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Integer },
  },
]
