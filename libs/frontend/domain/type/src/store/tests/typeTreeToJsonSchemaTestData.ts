/// <reference types='jest'/>
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { objectMap } from 'mobx-keystone'
import { v4 } from 'uuid'
import { FieldService } from '../field.service'
import { fieldServiceContext } from '../field.service.context'
import {
  AnyTypeModel,
  Field,
  fieldRef,
  InterfaceType,
  PrimitiveType,
  typeRef,
  UnionType,
} from '../models'
import { TypeService } from '../type.service'

export const stringType = new PrimitiveType({
  id: v4(),
  name: 'String type',
  kind: ITypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.String,
  ownerId: '',
})

export const stringTypeExpectedSchema = { type: 'string', default: '' }

export const intType = new PrimitiveType({
  id: v4(),
  name: 'Int type',
  kind: ITypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Integer,
  ownerId: '',
})

export const intTypeExpectedSchema = { type: 'integer', default: 0 }

export const unionType = new UnionType({
  id: v4(),
  name: 'Union type',
  kind: ITypeKind.UnionType,
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
  ownerId: '',
})

export const unionTypeExpectedSchema = {
  oneOf: [
    {
      type: 'object',
      typeName: stringType.name,
      label: '',
      properties: {
        value: { ...stringTypeExpectedSchema, label: undefined },
        type: {
          type: 'string',
          uniforms: expect.any(Object),
          label: 'Type',
          default: stringType.id,
          enum: [stringType.id],
        },
      },
    },
    {
      type: 'object',
      label: '',
      typeName: intType.name,
      properties: {
        value: { ...intTypeExpectedSchema, label: undefined },
        type: {
          type: 'string',
          uniforms: expect.any(Object),
          label: 'Type',
          default: intType.id,
          enum: [intType.id],
        },
      },
    },
  ],
}

const stringField = new Field({
  id: v4(),
  name: 'String field',
  key: 'stringField',
  type: typeRef(stringType),
})

const unionField = new Field({
  id: v4(),
  name: 'union field',
  key: 'unionField',
  type: typeRef(unionType),
})

const fieldService = new FieldService({
  fields: objectMap([
    [stringField.id, stringField],
    [unionField.id, unionField],
  ]),
})

// fieldServiceContext.setDefault(fieldService)

export const interfaceWithUnionField = new InterfaceType({
  id: v4(),
  name: 'Interface with union field',
  kind: ITypeKind.InterfaceType,
  ownerId: '',
  defaults: {},
  ownerAuthId: '',
  _fields: objectMap([
    [stringField.id, fieldRef(stringField)],
    [unionField.id, fieldRef(unionField)],
  ]),
})

// fieldServiceContext.set(interfaceWithUnionField, fieldService)
fieldServiceContext.apply(() => interfaceWithUnionField, fieldService)
// fieldServiceContext.setComputed(
//   () => interfaceWithUnionField,
//   () => fieldService,
// )

// Need a root store for references to be resolved
new TypeService({
  types: objectMap([
    [unionType.id, unionType as AnyTypeModel],
    [interfaceWithUnionField.id, interfaceWithUnionField],
    [intType.id, intType],
    [stringType.id, stringType],
  ]),
})

export const interfaceWithUnionExpectedSchema = {
  type: 'object',
  properties: {
    stringField: {
      ...stringTypeExpectedSchema,
      label: 'String field',
    },
    unionField: {
      ...unionTypeExpectedSchema,
      label: 'union field',
      oneOf: [
        merge({}, unionTypeExpectedSchema.oneOf[0], {
          properties: {
            type: { label: 'Type' },
            value: { label: undefined },
          },
        }),
        merge({}, unionTypeExpectedSchema.oneOf[1], {
          properties: {
            type: { label: 'Type' },
            value: { label: undefined },
          },
        }),
      ],
    },
  },
  required: [],
}
