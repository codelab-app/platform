import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../../../type/create-type'
import { CreateFieldInput } from '../create-field.input'

export const createPrimitiveTypeInput: CreateTypeInput = {
  name: 'String',
  typeKind: TypeKind.PrimitiveType,
  primitiveType: { primitiveKind: PrimitiveTypeKind.String },
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
