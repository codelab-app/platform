import Ajv from 'ajv'
import { MutableRefObject } from 'react'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'
import { SubmitController } from '../json-schema'

export const connectUniformSubmitRef = (
  submitRef: MutableRefObject<SubmitController | undefined> | undefined,
) => (r: { submit: () => any } | undefined | null) => {
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

export const createValidator = (schema: Record<string, unknown>) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = (schema: Record<string, unknown>) => {
  const schemaValidator = createValidator(schema)

  return new JSONSchemaBridge(schema, schemaValidator)
}
