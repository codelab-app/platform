import { CreateTypeInput, PrimitiveKind } from '@codelab/codegen/graphql'

export const primitiveTypeCreateInputs: Array<CreateTypeInput> = [
  {
    name: PrimitiveKind.String,
    primitiveType: { primitiveKind: PrimitiveKind.String },
  },
  {
    name: PrimitiveKind.Boolean,
    primitiveType: { primitiveKind: PrimitiveKind.Boolean },
  },
  {
    name: PrimitiveKind.Float,
    primitiveType: { primitiveKind: PrimitiveKind.Float },
  },
  {
    name: PrimitiveKind.Integer,
    primitiveType: { primitiveKind: PrimitiveKind.Integer },
  },
]
