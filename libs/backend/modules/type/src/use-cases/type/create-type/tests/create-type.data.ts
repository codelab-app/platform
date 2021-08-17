import { CreateTypeInput, PrimitiveKind } from '@codelab/shared/codegen/graphql'

export const createPrimitiveTypeStringInput: CreateTypeInput = {
  name: 'String',
  primitiveType: { primitiveKind: PrimitiveKind.String },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  interfaceType: true,
}
