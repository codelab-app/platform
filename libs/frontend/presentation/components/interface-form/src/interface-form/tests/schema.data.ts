/// <reference types='jest'/>

import {
  ACTION_TEMPLATE,
  COMPONENT_TEMPLATE,
} from '@codelab/frontend-domain-type/store'
import {
  CodeMirrorField,
  ExpressionBoolField,
  ExpressionNumField,
  ExpressionSelectField,
  ExpressionTextField,
  RichTextField,
  UnionTypeField,
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
  unionType,
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
  type: 'array',
}

export const unionTypeExpectedSchema = {
  discriminator: { propertyName: 'type' },
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
      default: stringType.id,
      enum: [stringType.id, intType.id],
      type: 'string',
      label: '',
      uniforms: {
        component: SelectField,
        options: [stringType, intType].map((type) => ({
          label: type.name,
          value: type.id,
        })),
      },
    },
    // a placeholder to avoid uniforms errors
    value: {
      label: '',
    },
  },
  oneOf: [
    {
      properties: {
        type: { const: stringType.id },
        value: stringTypeExpectedSchema,
      },
    },
    {
      properties: {
        type: { const: intType.id },
        value: intTypeExpectedSchema,
      },
    },
  ],
  uniforms: {
    component: UnionTypeField,
    unionType: unionType,
  },
  required: ['__isTypedProp', 'kind', 'type'],
  type: 'object',
}

export const interfaceWithUnionExpectedSchema = {
  properties: {
    stringField: {
      ...stringTypeExpectedSchema,
      label: 'String field',
    },
    unionField: {
      ...unionTypeExpectedSchema,
      label: 'Union field',
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
