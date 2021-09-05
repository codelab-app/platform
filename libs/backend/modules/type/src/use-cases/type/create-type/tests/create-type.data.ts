import { PrimitiveKind, TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../create-type.input'

export const createPrimitiveStringInput: CreateTypeInput = {
  name: 'String',
  typeKind: TypeKind.PrimitiveType,
  primitiveType: { primitiveKind: PrimitiveKind.String },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  typeKind: TypeKind.InterfaceType,
}
