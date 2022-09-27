import {
  GeneralValidationRules,
  ICreateFieldDTO,
  NumberValidationRules,
  StringValidationRules,
} from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createFieldSchema: JSONSchemaType<ICreateFieldDTO> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    id: { type: 'string', disabled: true },
    key: { type: 'string', autoFocus: true },
    name: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    validationSchema: {
      type: 'object',
      nullable: true,
      properties: {
        general: {
          type: 'object',
          nullable: false,
          properties: {
            [GeneralValidationRules.Nullable]: {
              type: 'boolean',
              nullable: false,
            },
          },
          required: [GeneralValidationRules.Nullable],
        },
        string: {
          type: 'object',
          nullable: true,
          properties: {
            [StringValidationRules.MinLength]: {
              type: 'integer',
              nullable: true,
            },
            [StringValidationRules.MaxLength]: {
              type: 'integer',
              nullable: true,
            },
            [StringValidationRules.Pattern]: { type: 'string', nullable: true },
          },
        },
        float: {
          type: 'object',
          nullable: true,
          properties: {
            [NumberValidationRules.Minimum]: {
              type: 'number',
              nullable: true,
            },
            [NumberValidationRules.Maximum]: {
              type: 'number',
              nullable: true,
            },
            [NumberValidationRules.ExclusiveMinimum]: {
              type: 'number',
              nullable: true,
            },
            [NumberValidationRules.ExclusiveMaximum]: {
              type: 'number',
              nullable: true,
            },
            [NumberValidationRules.MultipleOf]: {
              type: 'number',
              nullable: true,
            },
          },
        },
        integer: {
          type: 'object',
          nullable: true,
          properties: {
            [NumberValidationRules.Minimum]: {
              type: 'integer',
              nullable: true,
            },
            [NumberValidationRules.Maximum]: {
              type: 'integer',
              nullable: true,
            },
            [NumberValidationRules.ExclusiveMinimum]: {
              type: 'integer',
              nullable: true,
            },
            [NumberValidationRules.ExclusiveMaximum]: {
              type: 'integer',
              nullable: true,
            },
            [NumberValidationRules.MultipleOf]: {
              type: 'integer',
              nullable: true,
            },
          },
        },
      },
      required: ['general'],
    },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    fieldType: { type: 'string', nullable: true },
  },
  required: ['id', 'key', 'fieldType', 'validationSchema'],
}
