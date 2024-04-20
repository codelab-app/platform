/// <reference types='jest'/>
import merge from 'lodash/merge'
import { createTypedPropTypeExpectedSchema } from './schema.data.util'
import {
  actionType,
  elementType,
  enumFieldWithDefaultValue,
  enumType,
  intFieldWithRequiredValue,
  intType,
  reactNodeType,
  renderPropType,
  richTextType,
  stringFieldWithDefaultValue,
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

export const richTextTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(richTextType.kind, richTextType.id),
}

export const codeMirrorTypeExpectedSchema = {
  type: 'string',
  uniforms: expect.any(Object),
}

export const elementTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(elementType.kind, elementType.id),
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
    merge(
      {
        ...createTypedPropTypeExpectedSchema(stringType.kind, stringType.id),
        typeName: stringType.name,
      },
      { properties: { value: stringTypeExpectedSchema } },
    ),
    merge(
      {
        ...createTypedPropTypeExpectedSchema(intType.kind, intType.id),
        typeName: intType.name,
      },
      { properties: { value: intTypeExpectedSchema } },
    ),
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
    },
  },
  required: [],
  type: 'object',
}

export const interfaceWithRequiredDefaultFieldValuesExpectedSchema = {
  properties: {
    enumField: {
      ...enumTypeExpectedSchema,
      default: enumFieldWithDefaultValue.defaultValues,
      label: 'Enum field',
      type: 'string',
      uniforms: expect.any(Object),
    },
    intField: {
      ...intTypeExpectedSchema,
      label: 'Int field',
      nullable: false,
      type: 'integer',
      uniforms: expect.any(Object),
    },
    stringField: {
      ...stringTypeExpectedSchema,
      default: stringFieldWithDefaultValue.defaultValues,
      label: 'String field',
      type: 'string',
      uniforms: expect.any(Object),
    },
  },
  required: [intFieldWithRequiredValue.key],
  type: 'object',
}
