import type { JSONSchemaType } from 'ajv'
import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

interface FormData {
  firstName: string
  lastName: string
  workExperience: number
}

// const schema: JSONSchemaType<FormData> = {
//   title: 'Guest',
//   type: 'object',
//   properties: {
//     firstName: { type: 'string' },
//     lastName: { type: 'string' },
//     workExperience: {
//       description: 'Work experience in years',
//       type: 'integer',
//       minimum: 0,
//       maximum: 100,
//     },
//   },
//   required: ['firstName', 'lastName'],
// }

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
})

const createValidator = <T extends object>(schema: JSONSchemaType<T>) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    validator(model)

    return validator.errors?.length ? { details: validator.errors } : null
  }
}

const createBridge = <T extends object>(schema: JSONSchemaType<T>) => {
  return new JSONSchemaBridge(schema, schemaValidator)
}

export const Form = <T extends object>(schema: JSONSchemaType<T>) => {
  const schemaValidator = createValidator(schema)

  return <AutoForm onSubmit={console.log} schema={schema} />
}
