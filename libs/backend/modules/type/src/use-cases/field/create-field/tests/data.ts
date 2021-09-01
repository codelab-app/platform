import { PrimitiveKind, TypeKind } from '@codelab/shared/enums'
import { CreateTypeInput } from '../../../type/create-type'
import { CreateFieldInput } from '../create-field.input'

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
