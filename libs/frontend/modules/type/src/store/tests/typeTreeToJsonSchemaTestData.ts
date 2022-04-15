/// <reference types='jest'/>
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { InterfaceType, PrimitiveType, typeRef, UnionType } from '../models'

export const stringType = new PrimitiveType({
  id: v4(),
  name: 'String type',
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.String,
})

export const stringTypeExpectedSchema = { type: 'string' }

export const intType = new PrimitiveType({
  id: v4(),
  name: 'Int type',
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Integer,
})

export const intTypeExpectedSchema = { type: 'integer' }

export const unionType = new UnionType({
  id: v4(),
  name: 'Union type',
  typeKind: TypeKind.UnionType,
  typesOfUnionType: [typeRef(stringType), typeRef(intType)],
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
  typeKind: TypeKind.InterfaceType,
})

interfaceWithUnionField.addFieldLocal({
  name: 'String field',
  key: 'stringField',
  existingTypeId: stringType.id,
})

interfaceWithUnionField.addFieldLocal({
  name: 'union field',
  key: 'unionField',
  existingTypeId: unionType.id,
})

export const interfaceWithUnionExpectedSchema = {
  type: 'object',
  properties: {
    stringField: { ...stringTypeExpectedSchema, label: 'String field' },
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
