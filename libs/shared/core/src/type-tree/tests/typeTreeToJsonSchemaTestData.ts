/// <reference types='jest'/>
import {
  InterfaceTypeSchema,
  PrimitiveTypeKind,
  PrimitiveTypeSchema,
  TypeKind,
  UnionTypeSchema,
} from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { TypeGraphFactory } from '../TypeGraphFactory'

export const stringType = PrimitiveTypeSchema.parse({
  id: '0x2',
  name: 'String type',
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.String,
})

export const stringTypeExpectedSchema = { type: 'string' }

export const intType = PrimitiveTypeSchema.parse({
  id: '0x3',
  name: 'Int type',
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Integer,
})

export const intTypeExpectedSchema = { type: 'integer' }

export const unionType = UnionTypeSchema.parse({
  id: '0x1',
  name: 'Union type',
  typeKind: TypeKind.UnionType,
})

export const unionGraph = TypeGraphFactory.unionType(unionType, [
  stringType,
  intType,
])

export const unionTypeExpectedSchema = {
  oneOf: [
    {
      type: 'object',
      typeName: stringType.name,
      label: '',
      properties: {
        value: stringTypeExpectedSchema,
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
        value: intTypeExpectedSchema,
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

export const interfaceWithUnionField = InterfaceTypeSchema.parse({
  id: '0x4',
  name: 'Interface with union field',
  typeKind: TypeKind.InterfaceType,
})

export const interfaceWithUnionExpectedSchema = {
  type: 'object',
  label: undefined,
  properties: {
    stringField: { ...stringTypeExpectedSchema, label: 'String field' },
    unionField: {
      ...unionTypeExpectedSchema,
      label: 'union field',
      oneOf: [
        merge({}, unionTypeExpectedSchema.oneOf[0], {
          properties: {
            type: { label: '"union field" Type' },
            value: { label: undefined },
          },
        }),
        merge({}, unionTypeExpectedSchema.oneOf[1], {
          properties: {
            type: { label: '"union field" Type' },
            value: { label: undefined },
          },
        }),
      ],
    },
  },
}

export const interfaceWithUnionGraph = TypeGraphFactory.fromMultipleGraphs(
  TypeGraphFactory.interfaceType(
    interfaceWithUnionField,
    [unionType],
    [
      {
        name: 'String field',
        key: 'stringField',
        target: stringType.id,
        source: '0x4',
      },
      {
        name: 'union field',
        key: 'unionField',
        target: unionType.id,
        source: '0x4',
      },
    ],
  ),
  unionGraph,
)
