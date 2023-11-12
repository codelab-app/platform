import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/domain'
import { createRootDomainStore } from '@codelab/frontend/domain/shared'
import {
  ActionType,
  AppType,
  ArrayType,
  CodeMirrorType,
  ElementType,
  EnumType,
  Field,
  FieldDomainService,
  InterfaceType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  TypeDomainService,
  UnionType,
} from '@codelab/frontend/domain/type'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'

export const stringType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'String type',

  primitiveKind: PrimitiveTypeKind.String,
})

export const intType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'Int type',

  primitiveKind: PrimitiveTypeKind.Integer,
})

export const booleanType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'Boolean type',
  primitiveKind: PrimitiveTypeKind.Boolean,
})

export const appType = new AppType({
  id: v4(),
  kind: ITypeKind.AppType,
  name: 'App type',
})

export const actionType = new ActionType({
  __typename: 'ActionType',
  id: v4(),
  kind: ITypeKind.ActionType,
  name: 'Action type',
})

export const pageType = new PageType({
  id: v4(),
  kind: ITypeKind.PageType,
  name: 'Page type',
})

export const renderPropType = new RenderPropType({
  id: v4(),
  kind: ITypeKind.RenderPropType,
  name: 'Render prop type',
})

export const reactNodeType = new ReactNodeType({
  id: v4(),
  kind: ITypeKind.ReactNodeType,
  name: 'React node type',
})

export const codeMirrorType = new CodeMirrorType({
  id: v4(),
  kind: ITypeKind.CodeMirrorType,
  language: CodeMirrorLanguage.Javascript,
  name: 'CodeMirror type',
})

export const elementType = new ElementType({
  elementKind: ElementTypeKind.AllElements,
  id: v4(),
  kind: ITypeKind.ElementType,
  name: 'Element type',
})

export const enumType = new EnumType({
  allowedValues: [
    { id: v4(), key: 'Enum 1', label: 'Enum 1', value: 'Enum 1' },
    { id: v4(), key: 'Enum 2', label: 'Enum 2', value: 'Enum 2' },
    { id: v4(), key: 'Enum 3', label: 'Enum 3', value: 'Enum 3' },
  ],
  id: v4(),
  kind: ITypeKind.EnumType,
  name: 'Enum type',
})

export const arrayType = new ArrayType({
  id: v4(),
  itemType: typeRef(stringType),
  kind: ITypeKind.ArrayType,
  name: 'Array type',
})

export const unionType = new UnionType({
  id: v4(),
  kind: ITypeKind.UnionType,
  name: 'Union type',
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
})

const emptyInterface = new InterfaceType({
  id: v4(),
  name: 'Empty Interface Type',
})

const stringField = new Field({
  api: typeRef(emptyInterface),
  id: v4(),
  key: 'stringField',
  name: 'String field',
  type: typeRef(stringType),
})

const enumField = new Field({
  api: typeRef(emptyInterface),
  id: v4(),
  key: 'enumField',
  name: 'Enum field',
  type: typeRef(enumType),
})

export const stringFieldWithDefaultValue = new Field({
  api: typeRef(emptyInterface),
  defaultValues: 'string field default value',
  id: v4(),
  key: 'stringField',
  name: 'String field',
  type: typeRef(stringType),
})

export const intFieldWithRequiredValue = new Field({
  api: typeRef(emptyInterface),
  id: v4(),
  key: 'intField',
  name: 'Int field',
  type: typeRef(intType),
  validationRules: {
    general: {
      nullable: false,
    },
  },
})

export const enumFieldWithDefaultValue = new Field({
  api: typeRef(emptyInterface),
  defaultValues: enumType.allowedValues[0]?.value,
  id: v4(),
  key: 'enumField',
  name: 'Enum field',
  type: typeRef(enumType),
})

const unionField = new Field({
  api: typeRef(emptyInterface),
  id: v4(),
  key: 'unionField',
  name: 'union field',
  type: typeRef(unionType),
})

export const interfaceWithUnionField = new InterfaceType({
  _fields: objectMap([
    [stringField.id, fieldRef(stringField)],
    [unionField.id, fieldRef(unionField)],
  ]),
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Interface with union field',
})

export const interfaceWithEnumField = new InterfaceType({
  _fields: objectMap([
    [enumFieldWithDefaultValue.id, fieldRef(enumFieldWithDefaultValue)],
  ]),
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Interface with enum field',
})

export const interfaceWithRequiredAndDefaultFieldValues = new InterfaceType({
  _fields: objectMap([
    [stringFieldWithDefaultValue.id, fieldRef(stringFieldWithDefaultValue)],
    [intFieldWithRequiredValue.id, fieldRef(intFieldWithRequiredValue)],
    [enumFieldWithDefaultValue.id, fieldRef(enumFieldWithDefaultValue)],
  ]),
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Interface with default field values',
})

export const rootDomainStore = createRootDomainStore({
  context: {},
  store: {
    fieldDomainService: new FieldDomainService({
      fields: objectMap([
        [stringField.id, stringField],
        [unionField.id, unionField],
        [stringFieldWithDefaultValue.id, stringFieldWithDefaultValue],
        [intFieldWithRequiredValue.id, intFieldWithRequiredValue],
        [enumField.id, enumField],
        [enumFieldWithDefaultValue.id, enumFieldWithDefaultValue],
      ]),
    }),
    typeDomainService: new TypeDomainService({
      types: objectMap<ITypeModel>([
        [unionType.id, unionType],
        [interfaceWithUnionField.id, interfaceWithUnionField],
        [
          interfaceWithRequiredAndDefaultFieldValues.id,
          interfaceWithRequiredAndDefaultFieldValues,
        ],
        [intType.id, intType],
        [stringType.id, stringType],
        [enumType.id, enumType],
        [interfaceWithEnumField.id, interfaceWithEnumField],
      ]),
    }),
  },
})
