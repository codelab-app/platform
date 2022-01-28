import {
  ElementTypeKind,
  IArrayType,
  IElementType,
  IEnumType,
  IEnumTypeValue,
  IField,
  IInterfaceType,
  IPrimitiveType,
  IUnionType,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'

export const updatedName = 'New name'

export const primitiveTypeInput: IPrimitiveType = {
  id: '',
  typeKind: TypeKind.PrimitiveType,
  name: 'Primitive Type',
  owner: null,
  primitiveKind: PrimitiveTypeKind.String,
}

export const arrayTypeInput: Omit<IArrayType, 'itemType'> = {
  id: '',
  typeKind: TypeKind.ArrayType,
  name: 'Array Type',
}

export const interfaceField1: Omit<IField, 'target'> = {
  id: '',
  name: 'Field 1',
  key: 'field1',
  description: 'A test field',
  source: '',
}

export const interfaceField2: Omit<IField, 'target'> = {
  id: '',
  name: 'Field 2',
  key: 'field2',
  description: 'A test field 2',
  source: '',
}

export const interfaceTypeInput: Omit<IInterfaceType, 'fields'> = {
  id: '',
  typeKind: TypeKind.InterfaceType,
  name: 'Interface Type',
}

export const enumValue1: IEnumTypeValue = {
  id: '',
  name: 'Value 1',
  value: 'value1',
}

export const enumValue2: IEnumTypeValue = {
  id: '',
  name: 'Value 2',
  value: 'value2',
}

export const enumValue3: IEnumTypeValue = {
  id: '',
  name: 'Value 3',
  value: 'value3',
}

export const enumTypeInput: Omit<IEnumType, 'allowedValues'> = {
  id: '',
  typeKind: TypeKind.EnumType,
  name: 'Enum Type',
}

export const elementTypeInput: IElementType = {
  id: '',
  typeKind: TypeKind.ElementType,
  name: 'Element Type',
  owner: null,
  elementKind: ElementTypeKind.AllElements,
}

export const unionTypeInput: Omit<IUnionType, 'typesOfUnionType'> = {
  id: '',
  typeKind: TypeKind.UnionType,
  name: 'Union Type',
}
