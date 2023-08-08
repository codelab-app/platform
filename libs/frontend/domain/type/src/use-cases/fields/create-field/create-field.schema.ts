import type { ICreateFieldData } from '@codelab/frontend/abstract/core'
import {
  GeneralValidationRules,
  NumberValidationRules,
  StringValidationRules,
} from '@codelab/frontend/abstract/core'
import { idSchema, nonEmptyString } from '@codelab/frontend/presentation/view'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createFieldSchema: JSONSchemaType<ICreateFieldData> = {
  if: {
    properties: {
      validationRules: {
        properties: {
          general: {
            properties: {
              // Using enum, we can check if it matches the current value in the form
              [GeneralValidationRules.Nullable]: { const: false },
            },
          },
        },
      },
    },
  },
  properties: {
    ...idSchema,
    defaultValues: {
      // by using ref, this can support array or object type that
      // has items or properties of any possible default value type
      $ref: 'customTypes#/definitions/fieldDefaultValuesOrNullableFieldDefaultValues',
    },
    description: { nullable: true, type: 'string' },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    fieldType: { type: 'string' },
    interfaceTypeId: {
      type: 'string',
      uniforms: {
        component: () => null,
      },
    },
    key: {
      autoFocus: true,
      ...nonEmptyString,
    },
    name: { nullable: true, type: 'string' },
    validationRules: {
      nullable: true,
      properties: {
        general: {
          nullable: true,
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
  required: ['id', 'key', 'fieldType'],
  then: {
    required: ['id', 'key', 'fieldType'],
    properties: {
      defaultValues: {
        $ref: 'customTypes#/definitions/fieldDefaultValues',
      },
    },
  },
  title: 'Create Field Input',
  type: 'object',
}
