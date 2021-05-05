import { SubmitController } from '@codelab/frontend/shared'
import Ajv, { JSONSchemaType } from 'ajv'
import { MutableRefObject } from 'react'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'

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

export const createValidator = <T = unknown>(schema: any) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

export const createBridge = <T = unknown>(schema: JSONSchemaType<T>) => {
  const schemaValidator = createValidator(schema)

  return new JSONSchemaBridge(schema as any, schemaValidator)
}
