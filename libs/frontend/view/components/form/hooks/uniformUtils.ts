import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { JSONSchemaType, Schema } from 'ajv'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'
import type { MutableRefObject } from 'react'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'
import type { FormContextValue } from '../providers'

export const connectUniformSubmitRef =
  (submitRef: Maybe<MutableRefObject<Maybe<SubmitController>>>) =>
  (r: Nullish<{ submit: () => unknown }>) => {
    if (submitRef && r) {
      // eslint-disable-next-line no-param-reassign
      submitRef.current = {
        submit() {
          return r.submit()
        },
      }
    }
  }

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false })
addFormats(ajv)
addKeywords(ajv, ['typeof'])
ajv.addSchema({
  $id: 'customTypes',
  definitions: {
    fieldDefaultValues: {
      oneOf: [
        {
          type: 'string',
          nullable: true,
        },
        {
          type: 'boolean',
        },
        {
          type: ['number', 'integer'],
          nullable: true,
        },
        {
          type: 'array',
          nullable: true,
          items: { $ref: '#/definitions/fieldDefaultValues' },
        },
        {
          type: 'object',
          nullable: true,
          patternProperties: {
            '^.*$': { $ref: '#/definitions/fieldDefaultValues' },
          },
        },
      ],
    },
  },
})

export const createValidator = (schema: Schema, context?: FormContextValue) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    const modelToValidate = context?.allowExpressions
      ? context.appStore?.replaceStateInProps(model)
      : model

    console.log('modelToValidate', modelToValidate)
    validator(modelToValidate)
    console.log('validator.errors', validator.errors)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = <T = unknown>(
  schema: JSONSchemaType<T>,
  context?: FormContextValue,
) => {
  const schemaValidator = createValidator(schema, context)

  return new JSONSchemaBridge(schema, schemaValidator)
}
