'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { JSONSchemaType } from 'ajv'

import Ajv from 'ajv'
import { AutoForm } from 'uniforms-antd'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

interface FormData {
  firstName: string
  lastName: string
  workExperience: number
}

const testSchema: JSONSchemaType<FormData> = {
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      maximum: 100,
      minimum: 0,
      type: 'integer',
    },
  },
  required: [],
  // required: ['firstName', 'lastName'],
  title: 'Guest',
  type: 'object',
}

const ajv = new Ajv({
  allErrors: true,
  keywords: ['uniforms'],
  useDefaults: true,
})

const createValidator = <T,>(schema: JSONSchemaType<T>) => {
  const validator = ajv.compile(schema)

  return (model: ObjectLike) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

const schemaValidator = createValidator(testSchema)
const bridge = new JSONSchemaBridge({
  schema: testSchema,
  validator: schemaValidator,
})

export const GuestFormBasic = () => {
  return <AutoForm onSubmit={console.log} schema={bridge} />
}
