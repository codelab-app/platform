import type { IAnyType } from '@codelab/frontend/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'
import { FieldService } from '../field.service'
import {
  Field,
  fieldRef,
  InterfaceType,
  PrimitiveType,
  typeRef,
  UnionType,
} from '../models'
import { TypeService } from '../type.service'
import { TestRootStore } from './test-root-store'

export const stringType = new PrimitiveType({
  id: v4(),
  name: 'String type',
  kind: ITypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.String,
  ownerId: '',
})

export const intType = new PrimitiveType({
  id: v4(),
  name: 'Int type',
  kind: ITypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Integer,
  ownerId: '',
})

export const unionType = new UnionType({
  id: v4(),
  name: 'Union type',
  kind: ITypeKind.UnionType,
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
  ownerId: '',
})

const emptyInterface = new InterfaceType({
  id: v4(),
  name: 'Empty Interface Type',
  ownerId: '',
})

const stringField = new Field({
  id: v4(),
  name: 'String field',
  key: 'stringField',
  type: typeRef(stringType),
  api: typeRef(emptyInterface),
})

const unionField = new Field({
  id: v4(),
  name: 'union field',
  key: 'unionField',
  type: typeRef(unionType),
  api: typeRef(emptyInterface),
})

export const interfaceWithUnionField = new InterfaceType({
  id: v4(),
  name: 'Interface with union field',
  kind: ITypeKind.InterfaceType,
  ownerId: '',
  _fields: objectMap([
    [stringField.id, fieldRef(stringField)],
    [unionField.id, fieldRef(unionField)],
  ]),
})

export const rootStore = new TestRootStore({
  typeService: new TypeService({
    types: objectMap<IAnyType>([
      [unionType.id, unionType],
      [interfaceWithUnionField.id, interfaceWithUnionField],
      [intType.id, intType],
      [stringType.id, stringType],
    ]),
  }),
  fieldService: new FieldService({
    fields: objectMap([
      [stringField.id, stringField],
      [unionField.id, unionField],
    ]),
  }),
})
