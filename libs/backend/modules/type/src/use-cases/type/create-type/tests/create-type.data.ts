import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../inputs/create-type.input'

export const createPrimitiveStringInput: CreateTypeInput = {
  name: 'String',
  typeKind: TypeKind.PrimitiveType,
  primitiveType: { primitiveKind: PrimitiveTypeKind.String },
}

export const createEnumTypeInput: CreateTypeInput = {
  name: 'Some Enum',
  typeKind: TypeKind.EnumType,
  enumType: {
    allowedValues: [
      { name: 'First', value: 'first' },
      { name: 'Second', value: 'second' },
    ],
  },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  typeKind: TypeKind.InterfaceType,
}
