/// <reference types='jest'/>
import merge from 'lodash/merge'
import { intType, stringType } from './setup-store'

export const stringTypeExpectedSchema = { type: 'string', default: '' }

export const intTypeExpectedSchema = { type: 'integer', default: 0 }

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
