import type { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import {
  GeneralValidationRules,
  NumberValidationRules,
  StringValidationRules,
} from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import { nonEmptyString } from '@codelab/frontend/shared/utils'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createFieldSchema: JSONSchemaType<ICreateFieldDTO> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    ...idSchema,
    key: {
      autoFocus: true,
      ...nonEmptyString,
    },
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
              default: false,
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
        [PrimitiveTypeKind.Number]: {
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
    interfaceTypeId: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    fieldType: { type: 'string', nullable: true },
    defaultValues: {
      // by using ref, this can support array or object type that
      // has items or properties of any possible default value type
      $ref: 'customTypes#/definitions/fieldDefaultValues',
    },
  },
  // This is overridden if the field is not nullable, which will require a value for `defaultValues`
  required: ['id', 'key', 'fieldType'],
  if: {
    properties: {
      validationRules: {
        properties: {
          general: {
            properties: {
              // Using enum, we can check if it matches the current value in the form
              [GeneralValidationRules.Nullable]: { enum: [false] },
            },
          },
        },
      },
    },
  },
  then: { required: ['id', 'key', 'fieldType', 'defaultValues'] },
}
