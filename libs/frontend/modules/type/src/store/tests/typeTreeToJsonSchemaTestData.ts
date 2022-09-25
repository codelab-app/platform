/// <reference types='jest'/>
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { InterfaceType, PrimitiveType, typeRef, UnionType } from '../models'

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

export const interfaceWithUnionField = new InterfaceType({
  id: v4(),
  name: 'Interface with union field',
  kind: ITypeKind.InterfaceType,
  ownerId: '',
  defaults: {},
  ownerAuthId: '',
})

interfaceWithUnionField.updateFieldCache({
  id: v4(),
  name: 'String field',
  key: 'stringField',
  fieldType: {
    id: stringType.id,
  },
})

interfaceWithUnionField.updateFieldCache({
  id: v4(),
  name: 'union field',
  key: 'unionField',
  fieldType: {
    id: unionType.id,
  },
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
}
