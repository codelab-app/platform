'use client'

import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  GeneralValidationRules,
  type IFieldCreateFormData,
  NumberValidationRules,
  StringValidationRules,
} from '@codelab/shared-abstract-core'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { SelectField } from 'uniforms-antd'

export const createFieldSchema: JSONSchemaType<IFieldCreateFormData> = {
  properties: {
    ...idSchema,
    description: {
      nullable: true,
      type: 'string',
    },
    fieldType: {
      type: 'object',
      properties: {
        ...idSchema({
          uniforms: { component: SelectField },
          disabled: false,
          label: 'Type',
        }),
      },
      required: ['id'],
    },
    api: {
      type: 'object',
      label: '',
      properties: {
        ...idSchema,
      },
      required: ['id'],
    },
    key: {
      autoFocus: true,
      ...nonEmptyString,
    },
    name: {
      nullable: true,
      type: 'string',
    },
    validationRules: {
      nullable: true,
      properties: {
        general: {
          nullable: true,
          label: '',
          properties: {
            [GeneralValidationRules.Nullable]: {
              default: false,
              nullable: true,
              type: 'boolean',
            },
          },
          type: 'object',
        },
        [PrimitiveTypeKind.String]: {
          nullable: true,
          label: '',
          properties: {
            [StringValidationRules.MinLength]: {
              nullable: true,
              type: 'integer',
            },
            [StringValidationRules.MaxLength]: {
              nullable: true,
              type: 'integer',
            },
            [StringValidationRules.Pattern]: { nullable: true, type: 'string' },
          },
          type: 'object',
        },
        [PrimitiveTypeKind.Number]: {
          nullable: true,
          label: '',
          properties: {
            [NumberValidationRules.Minimum]: {
              nullable: true,
              type: 'number',
            },
            [NumberValidationRules.Maximum]: {
              nullable: true,
              type: 'number',
            },
            [NumberValidationRules.ExclusiveMinimum]: {
              nullable: true,
              type: 'number',
            },
            [NumberValidationRules.ExclusiveMaximum]: {
              nullable: true,
              type: 'number',
            },
            [NumberValidationRules.MultipleOf]: {
              nullable: true,
              type: 'number',
            },
          },
          type: 'object',
        },
        [PrimitiveTypeKind.Integer]: {
          nullable: true,
          label: '',
          properties: {
            [NumberValidationRules.Minimum]: {
              nullable: true,
              type: 'integer',
            },
            [NumberValidationRules.Maximum]: {
              nullable: true,
              type: 'integer',
            },
            [NumberValidationRules.ExclusiveMinimum]: {
              nullable: true,
              type: 'integer',
            },
            [NumberValidationRules.ExclusiveMaximum]: {
              nullable: true,
              type: 'integer',
            },
            [NumberValidationRules.MultipleOf]: {
              nullable: true,
              type: 'integer',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
  },
  // This is overridden if the field is not nullable, which will require a value for `defaultValues`
  required: ['id', 'key', 'fieldType', 'api'],
  title: 'Create Field Input',
  type: 'object',
}
