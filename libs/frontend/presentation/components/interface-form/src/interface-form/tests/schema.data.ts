/// <reference types='jest'/>
import merge from 'lodash/merge'
import { createTypedPropTypeExpectedSchema } from './schema.data.util'
import {
  actionType,
  appType,
  codeMirrorType,
  elementType,
  enumFieldWithDefaultValue,
  enumType,
  intFieldWithRequiredValue,
  intType,
  pageType,
  reactNodeType,
  renderPropType,
  richTextType,
  stringFieldWithDefaultValue,
  stringType,
} from './setup-store'

export const stringTypeExpectedSchema = {
  type: 'string',
}

export const intTypeExpectedSchema = {
  type: 'integer',
}

export const booleanTypeExpectedSchema = {
  default: false,
  type: 'boolean',
}

export const appTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(appType.kind, appType.id),
}

export const pageTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(pageType.kind, pageType.id),
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
  ...createTypedPropTypeExpectedSchema(codeMirrorType.kind, codeMirrorType.id),
}

export const elementTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(elementType.kind, elementType.id),
}

export const enumTypeExpectedSchema = {
  enum: enumType.allowedValues.map(({ value }) => value),
  type: 'string',
}

export const arrayTypeExpectedSchema = {
  items: {},
  type: 'array',
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
    },
    intField: {
      ...intTypeExpectedSchema,
      label: 'Int field',
      nullable: false,
      type: 'integer',
    },
    stringField: {
      ...stringTypeExpectedSchema,
      default: stringFieldWithDefaultValue.defaultValues,
      label: 'String field',
      type: 'string',
    },
  },
  required: [intFieldWithRequiredValue.key],
  type: 'object',
}
