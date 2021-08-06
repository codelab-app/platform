import { CreateTypeInput, PrimitiveKind } from '@codelab/codegen/graphql'

export const primitiveTypes: Array<CreateTypeInput> = [
  {
    name: 'String',
    primitiveType: { primitiveKind: PrimitiveKind.String },
  },
  {
    name: 'Boolean',
    primitiveType: { primitiveKind: PrimitiveKind.Boolean },
  },
  {
    name: 'Float',
    primitiveType: { primitiveKind: PrimitiveKind.Float },
  },
  {
    name: 'Integer',
    primitiveType: { primitiveKind: PrimitiveKind.Integer },
  },
]
