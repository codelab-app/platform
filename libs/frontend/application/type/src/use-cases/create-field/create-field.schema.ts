import type { IFieldCreateData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  nullableIdSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  GeneralValidationRules,
  NumberValidationRules,
  StringValidationRules,
} from '@codelab/shared-abstract-core'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'

export const createFieldSchema: JSONSchemaType<IFieldCreateData> = {
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
    ...idSchema(),
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
    prevSibling: {
      nullable: true,
      properties: {
        ...nullableIdSchema({
          label: 'Prev Sibling',
          disabled: false,
        }),
      },
      label: '',
      required: [],
      type: 'object',
    },
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
