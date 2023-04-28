import type { IType } from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Field, InterfaceType, PrimitiveType, UnionType } from '../models'

export const stringType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'String type',
  owner: {
    auth0Id: '',
  },
  primitiveKind: PrimitiveTypeKind.String,
})

export const intType = new PrimitiveType({
  id: v4(),
  kind: ITypeKind.PrimitiveType,
  name: 'Int type',
  owner: {
    auth0Id: '',
  },
  primitiveKind: PrimitiveTypeKind.Integer,
})

export const unionType = new UnionType({
  id: v4(),
  kind: ITypeKind.UnionType,
  name: 'Union type',
  owner: {
    auth0Id: '',
  },
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
})

const emptyInterface = new InterfaceType({
  id: v4(),
  name: 'Empty Interface Type',
  owner: {
    auth0Id: '',
  },
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
  owner: {
    auth0Id: '',
  },
})
