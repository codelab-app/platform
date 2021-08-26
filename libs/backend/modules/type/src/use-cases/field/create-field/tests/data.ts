import {
  CreateFieldInput,
  CreateTypeInput,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/codegen/graphql'

export const createPrimitiveTypeInput: CreateTypeInput = {
  name: 'String',
  typeKind: TypeKind.PrimitiveType,
  primitiveType: { primitiveKind: PrimitiveKind.String },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  typeKind: TypeKind.InterfaceType,
}

export const partialCreateFieldInput: Partial<CreateFieldInput> = {
  name: 'Text',
  key: 'children',
  description: 'Enter text here',
}
