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

const ajv = new Ajv({ allErrors: true, useDefaults: true })

export const createValidator = (schema: object) => {
  const validator = ajv.compile(schema)

  return (model: object) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = (schema: object) => {
  const schemaValidator = createValidator(schema)

  return new JSONSchemaBridge(schema, schemaValidator)
}
