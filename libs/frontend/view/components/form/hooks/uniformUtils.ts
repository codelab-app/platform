import type { SubmitController } from '@codelab/frontend/abstract/types'
import { replaceStateInProps } from '@codelab/frontend/shared/utils'
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
  (ref: Nullish<{ submit: () => unknown }>) => {
    if (submitRef && ref) {
      // eslint-disable-next-line no-param-reassign
      submitRef.current = {
        submit: () => ref.submit(),
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
      oneOf: [
        {
          nullable: true,
          type: 'string',
        },
        {
          type: 'boolean',
        },
        {
          nullable: true,
          type: ['number', 'integer'],
        },
        {
          items: { $ref: '#/definitions/fieldDefaultValues' },
          nullable: true,
          type: 'array',
        },
        {
          nullable: true,
          patternProperties: {
            '^.*$': { $ref: '#/definitions/fieldDefaultValues' },
          },
          type: 'object',
        },
      ],
    },
  },
})

export const createValidator = (schema: Schema, context?: FormContextValue) => {
  // const validator = ajv.compile(schema)
  const validator = ajv.compile({})

  return (model: Record<string, unknown>) => {
    const modelToValidate = context?.allowExpressions
      ? replaceStateInProps(model, context.appStore?.state.values)
      : model

    validator(modelToValidate)

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
