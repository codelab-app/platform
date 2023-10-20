import type { IType } from '@codelab/frontend/abstract/domain'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/domain'
import {
  Field,
  InterfaceType,
  PrimitiveType,
  TypeDomainService,
  UnionType,
} from '@codelab/frontend/domain/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'
import { FieldService } from '../../services'
import { TestRootStore } from './test-root-store'

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

export const rootStore = new TestRootStore({
  fieldService: new FieldService({
    fields: objectMap([
      [stringField.id, stringField],
      [unionField.id, unionField],
    ]),
  }),
  typeService: new TypeDomainService({
    types: objectMap<IType>([
      [unionType.id, unionType],
      [interfaceWithUnionField.id, interfaceWithUnionField],
      [intType.id, intType],
      [stringType.id, stringType],
    ]),
  }),
})
