import type {
  IDomainStore,
  ITypeModel,
} from '@codelab/frontend-abstract-domain'

import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldRef,
  pageDomainServiceContext,
  typeRef,
  userDomainServiceContext,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { ActionDomainService } from '@codelab/frontend-domain-action/services'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { ComponentDomainService } from '@codelab/frontend-domain-component/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { domainStoreFactory } from '@codelab/frontend-domain-shared'
import {
  FieldDomainService,
  TypeDomainService,
} from '@codelab/frontend-domain-type/services'
import {
  ActionType,
  AppType,
  ArrayType,
  CodeMirrorType,
  ElementType,
  EnumType,
  Field,
  InterfaceType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  RichTextType,
  UnionType,
} from '@codelab/frontend-domain-type/store'
import { UserDomainService } from '@codelab/frontend-domain-user/services'
import { User } from '@codelab/frontend-domain-user/store'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { userDto } from '@codelab/shared-data-test'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
  PrimitiveTypeKind,
} from '@codelab/shared-infra-gqlgen'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'

export const user = User.create(userDto)

export const stringType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'String type',
  owner: userRef(user.id),
  primitiveKind: PrimitiveTypeKind.String,
})

export const intType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'Int type',
  owner: userRef(user.id),
  primitiveKind: PrimitiveTypeKind.Integer,
})

export const booleanType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'Boolean type',
  owner: userRef(user.id),
  primitiveKind: PrimitiveTypeKind.Boolean,
})

export const appType = new AppType({
  id: v4(),
  kind: ITypeKind.AppType,
  name: 'App type',
  owner: userRef(user.id),
})

export const actionType = new ActionType({
  id: v4(),
  kind: ITypeKind.ActionType,
  name: 'Action type',
  owner: userRef(user.id),
})

export const pageType = new PageType({
  id: v4(),
  kind: ITypeKind.PageType,
  name: 'Page type',
  owner: userRef(user.id),
})

export const renderPropType = new RenderPropType({
  id: v4(),
  kind: ITypeKind.RenderPropType,
  name: 'Render prop type',
  owner: userRef(user.id),
})

export const richTextType = new RichTextType({
  id: v4(),
  kind: ITypeKind.RichTextType,
  name: 'Rich text type',
  owner: userRef(user.id),
})

export const reactNodeType = new ReactNodeType({
  id: v4(),
  kind: ITypeKind.ReactNodeType,
  name: 'React node type',
  owner: userRef(user.id),
})

export const codeMirrorType = new CodeMirrorType({
  id: v4(),
  kind: ITypeKind.CodeMirrorType,
  language: CodeMirrorLanguage.Javascript,
  name: 'CodeMirror type',
  owner: userRef(user.id),
})

export const elementType = new ElementType({
  elementKind: ElementTypeKind.AllElements,
  id: v4(),
  kind: ITypeKind.ElementType,
  name: 'Element type',
  owner: userRef(user.id),
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
  owner: userRef(user.id),
})

export const arrayType = new ArrayType({
  id: v4(),
  itemType: typeRef(stringType),
  kind: ITypeKind.ArrayType,
  name: 'Array type',
  owner: userRef(user.id),
})

export const unionType = new UnionType({
  id: v4(),
  kind: ITypeKind.UnionType,
  name: 'Union type',
  owner: userRef(user.id),
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
})

const emptyInterface = new InterfaceType({
  id: v4(),
  name: 'Empty Interface Type',
  owner: userRef(user.id),
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
  name: 'Union field',
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
  owner: userRef(user.id),
})

export const interfaceWithEnumField = new InterfaceType({
  _fields: objectMap([
    [enumFieldWithDefaultValue.id, fieldRef(enumFieldWithDefaultValue)],
  ]),
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Interface with enum field',
  owner: userRef(user.id),
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
  owner: userRef(user.id),
})

export const domainStore = domainStoreFactory({
  context: {
    atomDomainServiceContext,
    elementDomainServiceContext,
    appDomainServiceContext,
    actionDomainServiceContext,
    pageDomainServiceContext,
    componentDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    actionDomainService: new ActionDomainService({}),
    userDomainService: new UserDomainService({ user }),
    appDomainService: new AppDomainService({}),
    componentDomainService: new ComponentDomainService({}),
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
    pageDomainService: new PageDomainService({}),
    typeDomainService: new TypeDomainService({
      types: objectMap<ITypeModel>([
        [arrayType.id, arrayType],
        [actionType.id, actionType],
        [appType.id, appType],
        [unionType.id, unionType],
        [interfaceWithUnionField.id, interfaceWithUnionField],
        [
          interfaceWithRequiredAndDefaultFieldValues.id,
          interfaceWithRequiredAndDefaultFieldValues,
        ],
        [intType.id, intType],
        [pageType.id, pageType],
        [booleanType.id, booleanType],
        [stringType.id, stringType],
        [enumType.id, enumType],
        [reactNodeType.id, reactNodeType],
        [renderPropType.id, renderPropType],
        [codeMirrorType.id, codeMirrorType],
        [richTextType.id, richTextType],
        [elementType.id, elementType],
        [emptyInterface.id, emptyInterface],
        [interfaceWithEnumField.id, interfaceWithEnumField],
      ]),
    }),
  },
}) as IDomainStore
