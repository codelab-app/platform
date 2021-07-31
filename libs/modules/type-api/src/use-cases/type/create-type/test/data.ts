import { CreateTypeInput, PrimitiveKind } from '@codelab/codegen/graphql'

export const createPrimitiveTypeStringInput: CreateTypeInput = {
  name: 'String',
  primitiveType: { primitiveKind: PrimitiveKind.String },
}
