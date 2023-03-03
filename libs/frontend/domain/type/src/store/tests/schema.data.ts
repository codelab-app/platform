/// <reference types='jest'/>
import merge from 'lodash/merge'
import { intType, stringType } from './setup-store'

export const stringTypeExpectedSchema = { type: 'string' }

export const intTypeExpectedSchema = { type: 'integer' }

export const unionTypeExpectedSchema = {
  oneOf: [
    {
      label: '',
      properties: {
        type: {
          default: stringType.id,
          enum: [stringType.id],
          label: 'Type',
          type: 'string',
          uniforms: expect.any(Object),
        },
        value: { ...stringTypeExpectedSchema, label: undefined },
      },
      type: 'object',
      typeName: stringType.name,
    },
    {
      label: '',
      properties: {
        type: {
          default: intType.id,
          enum: [intType.id],
          label: 'Type',
          type: 'string',
          uniforms: expect.any(Object),
        },
        value: { ...intTypeExpectedSchema, label: undefined },
      },
      type: 'object',
      typeName: intType.name,
    },
  ],
}

export const interfaceWithUnionExpectedSchema = {
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
  type: 'object',
}
