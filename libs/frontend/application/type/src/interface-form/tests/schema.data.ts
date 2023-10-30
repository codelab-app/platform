/// <reference types='jest'/>
import merge from 'lodash/merge'
import { createTypedPropTypeExpectedSchema } from './schema.data.util'
import {
  actionType,
  elementType,
  enumType,
  intType,
  reactNodeType,
  renderPropType,
  stringType,
} from './setup-store'

export const stringTypeExpectedSchema = {
  type: 'string',
  uniforms: expect.any(Object),
}

export const intTypeExpectedSchema = {
  type: 'integer',
  uniforms: expect.any(Object),
}

export const booleanTypeExpectedSchema = {
  default: false,
  type: 'boolean',
  uniforms: expect.any(Object),
}

export const appTypeExpectedSchema = {
  type: 'string',
  uniforms: expect.any(Object),
}

export const pageTypeExpectedSchema = {
  type: 'string',
  uniforms: expect.any(Object),
}

export const actionTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(actionType.kind, actionType.id),
}

export const renderPropTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(renderPropType.kind, renderPropType.id),
}

export const reactNodeTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(reactNodeType.kind, reactNodeType.id),
}

export const codeMirrorTypeExpectedSchema = {
  type: 'string',
  uniforms: expect.any(Object),
}

export const elementTypeExpectedSchema = {
  properties: {
    kind: {
      default: 'ElementType',
      enum: ['ElementType'],
      label: 'Kind',
      type: 'string',
      uniforms: expect.any(Object),
    },
    type: {
      default: elementType.id,
      enum: [elementType.id],
      label: '',
      type: 'string',
      uniforms: expect.any(Object),
    },
    value: {
      label: '',
      type: 'string',
      uniforms: expect.any(Object),
    },
  },
  type: 'object',
  uniforms: expect.any(Object),
}

export const enumTypeExpectedSchema = {
  enum: enumType.allowedValues.map(({ value }) => value),
  type: 'string',
  uniforms: expect.any(Object),
}

export const arrayTypeExpectedSchema = {
  items: {},
  type: 'array',
  uniforms: expect.any(Object),
}

export const unionTypeExpectedSchema = {
  oneOf: [
    {
      label: '',
      properties: {
        kind: {
          default: stringType.kind,
          enum: [stringType.kind],
          label: 'TypeKind',
          type: 'string',
          uniforms: expect.any(Object),
        },
        type: {
          default: stringType.id,
          enum: [stringType.id],
          label: 'Type',
          type: 'string',
          uniforms: expect.any(Object),
        },
        value: { ...stringTypeExpectedSchema },
      },
      required: ['type'],
      type: 'object',
      typeName: stringType.name,
    },
    {
      label: '',
      properties: {
        kind: {
          default: intType.kind,
          enum: [intType.kind],
          label: 'TypeKind',
          type: 'string',
          uniforms: expect.any(Object),
        },
        type: {
          default: intType.id,
          enum: [intType.id],
          label: 'Type',
          type: 'string',
          uniforms: expect.any(Object),
        },
        value: { ...intTypeExpectedSchema },
      },
      required: ['type'],
      type: 'object',
      typeName: intType.name,
    },
  ],
  uniforms: expect.any(Object),
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
            kind: { label: 'TypeKind' },
            type: { label: 'Type' },
            value: { label: undefined },
          },
        }),
        merge({}, unionTypeExpectedSchema.oneOf[1], {
          properties: {
            kind: { label: 'TypeKind' },
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
