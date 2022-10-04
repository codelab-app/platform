import { SubmitController } from '@codelab/frontend/abstract/types'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { Schema } from 'ajv'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import { MutableRefObject } from 'react'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'

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

export const createValidator = (schema: Schema) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = <T = unknown>(schema: JSONSchemaType<T>) => {
  const schemaValidator = createValidator(schema)

  return new JSONSchemaBridge(schema, schemaValidator)
}
