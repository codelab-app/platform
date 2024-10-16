import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe, Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { TSchema } from '@sinclair/typebox'
import type { JSONSchemaType, Schema } from 'ajv'
import type { MutableRefObject } from 'react'

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'

export const connectUniformSubmitRef =
  (submitRef: Maybe<MutableRefObject<Maybe<SubmitController>>>) =>
  (ref: Nullish<{ submit(): unknown; validate(): unknown }>) => {
    if (submitRef && ref) {
      // eslint-disable-next-line no-param-reassign
      submitRef.current = {
        submit: () => ref.submit(),
        validate: () => ref.validate(),
      }
    }
  }

const ajv = new Ajv({ allErrors: true, strict: false, useDefaults: true })

addFormats(ajv)
addKeywords(ajv, ['typeof', 'transform'])

// we can add custom type definitions here that may be too complex to do in the actual schema
ajv.addSchema({
  $id: 'customTypes',
  definitions: {
    // this allows validation on array or object type that references itself
    fieldDefaultValues: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'boolean',
        },
        {
          type: ['number', 'integer'],
        },
        {
          items: { $ref: '#/definitions/fieldDefaultValues' },
          type: 'array',
        },
        {
          patternProperties: {
            '^.*$': { $ref: '#/definitions/fieldDefaultValues' },
          },
          type: 'object',
        },
        /**
         * Make it 'nullable' by default
         */
        {
          type: 'null',
        },
      ],
    },
    // Adding these definitions here to avoid type errors because
    // JSONSchemaType does not support unions although json schema does
    fieldDefaultValuesOrNullableFieldDefaultValues: {
      anyOf: [
        {
          $ref: '#/definitions/fieldDefaultValues',
        },
        {
          $ref: '#/definitions/nullableFieldDefaultValues',
        },
      ],
    },
    nullableFieldDefaultValues: {
      anyOf: [
        {
          $ref: '#/definitions/fieldDefaultValues',
        },
        {
          type: 'null',
        },
      ],
    },
  },
})

ajv.addKeyword({
  errors: false,
  keyword: 'forbiddenValues',
  schema: true,
  validate: (forbiddenValues: Array<string>, data: string) => {
    return !forbiddenValues.includes(data)
  },
})

export const createValidator = (schema: Schema) => {
  const validator = ajv.compile(schema)

  return (model: ObjectLike) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = <T extends ObjectLike>(
  schema: JSONSchemaType<T> | TSchema,
) => {
  return new JSONSchemaBridge(schema, createValidator(schema))
}
