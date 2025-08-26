/// <reference types='jest'/>

import {
  ACTION_TEMPLATE,
  COMPONENT_TEMPLATE,
} from '@codelab/frontend-domain-type/store'
import {
  CodeMirrorField,
  ExpressionBoolField,
  ExpressionListField,
  ExpressionNumField,
  ExpressionSelectField,
  ExpressionTextField,
  ExpressionUnionField,
  RichTextField,
} from '@codelab/frontend-presentation-components-form'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { HiddenField, SelectField } from 'uniforms-antd'

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
  uniforms: { component: ExpressionTextField },
}

export const intTypeExpectedSchema = {
  type: 'integer',
  uniforms: { component: ExpressionNumField },
}

export const booleanTypeExpectedSchema = {
  default: false,
  type: 'boolean',
  uniforms: { component: ExpressionBoolField },
}

export const appTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    appType.kind,
    { component: ExpressionSelectField, options: [] },
    appType.id,
  ),
}

export const pageTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    pageType.kind,
    { component: ExpressionSelectField, options: [] },
    pageType.id,
  ),
}

export const actionTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    actionType.kind,
    {
      component: ExpressionSelectField,
      options: [],
      defaultExpression: ACTION_TEMPLATE,
    },
    actionType.id,
  ),
}

export const renderPropTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    renderPropType.kind,
    {
      component: ExpressionSelectField,
      options: [],
      defaultExpression: COMPONENT_TEMPLATE,
    },
    renderPropType.id,
  ),
}

export const reactNodeTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    reactNodeType.kind,
    {
      component: ExpressionSelectField,
      options: [],
      defaultExpression: COMPONENT_TEMPLATE,
    },
    reactNodeType.id,
  ),
}

export const richTextTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    richTextType.kind,
    { component: RichTextField },
    richTextType.id,
  ),
}

export const codeMirrorTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    codeMirrorType.kind,
    { component: CodeMirrorField },
    codeMirrorType.id,
  ),
}

export const elementTypeExpectedSchema = {
  ...createTypedPropTypeExpectedSchema(
    elementType.kind,
    { component: ExpressionSelectField, options: [] },
    elementType.id,
  ),
}

export const enumTypeExpectedSchema = {
  enum: enumType.allowedValues.map(({ value }) => value),
  type: 'string',
  uniforms: {
    component: ExpressionSelectField,
    options: enumType.allowedValues.map(({ label, value }) => ({
      label,
      value,
    })),
  },
}

export const arrayTypeExpectedSchema = {
  items: stringTypeExpectedSchema,
  uniforms: { component: ExpressionListField },
  type: 'array',
}

export const unionTypeExpectedSchema = {
  discriminator: {
    propertyName: 'type',
  },
  oneOf: [
    {
      properties: {
        __isTypedProp: {
          default: true,
          type: 'boolean',
          uniforms: { component: HiddenField },
        },
        kind: {
          default: stringType.kind,
          enum: [ITypeKind.PrimitiveType],
          type: 'string',
          uniforms: { component: HiddenField },
        },
        type: {
          const: stringType.id,
          default: stringType.id,
          enum: [stringType.id, intType.id],
          label: '',
          type: 'string',
          uniforms: {
            component: SelectField,
            options: [
              { label: stringType.name, value: stringType.id },
              { label: intType.name, value: intType.id },
            ],
          },
        },
        value: {
          ...stringTypeExpectedSchema,
          label: '',
        },
      },
    },
    {
      properties: {
        __isTypedProp: {
          default: true,
          type: 'boolean',
          uniforms: {
            component: HiddenField,
          },
        },
        kind: {
          default: intType.kind,
          enum: [ITypeKind.PrimitiveType],
          type: 'string',
          uniforms: { component: HiddenField },
        },
        type: {
          const: intType.id,
          default: intType.id,
          enum: [stringType.id, intType.id],
          type: 'string',
          label: '',
          uniforms: {
            component: SelectField,
            options: [
              { label: stringType.name, value: stringType.id },
              { label: intType.name, value: intType.id },
            ],
          },
        },
        value: {
          ...intTypeExpectedSchema,
          label: '',
        },
      },
    },
  ],
  required: ['__isTypedProp', 'kind', 'type'],
  type: 'object',
  uniforms: {
    component: ExpressionUnionField,
  },
}

export const interfaceWithUnionExpectedSchema = {
  properties: {
    stringField: stringTypeExpectedSchema,
    unionField: unionTypeExpectedSchema,
  },
  required: [],
  type: 'object',
}

export const interfaceWithRequiredDefaultFieldValuesExpectedSchema = {
  properties: {
    enumField: {
      ...enumTypeExpectedSchema,
      default: enumFieldWithDefaultValue.defaultValues,
      type: 'string',
    },
    intField: {
      ...intTypeExpectedSchema,
      nullable: false,
      type: 'integer',
    },
    stringField: {
      ...stringTypeExpectedSchema,
      default: stringFieldWithDefaultValue.defaultValues,
      type: 'string',
    },
  },
  required: [intFieldWithRequiredValue.key],
  type: 'object',
}
