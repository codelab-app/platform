import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
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
    validationRules: {
      type: 'object',
      nullable: true,
      properties: {
        general: {
          type: 'object',
          nullable: true,
          properties: {
            [GeneralValidationRules.Nullable]: {
              type: 'boolean',
              nullable: true,
            },
          },
        },
        [PrimitiveTypeKind.String]: {
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
        [PrimitiveTypeKind.Float]: {
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
        [PrimitiveTypeKind.Integer]: {
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
    },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    fieldType: { type: 'string', nullable: true },
  },
  required: ['id', 'key', 'fieldType'],
}
