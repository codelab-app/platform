import {
  CreateFieldInput,
  CreateTypeInput,
  PrimitiveKind,
} from '@codelab/shared/codegen/graphql'

export const createPrimitiveTypeInput: CreateTypeInput = {
  name: 'String',
  primitiveType: { primitiveKind: PrimitiveKind.String },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  interfaceType: true,
}

export const partialCreateFieldInput: Partial<CreateFieldInput> = {
  name: 'Text',
  key: 'children',
  description: 'Enter text here',
}
