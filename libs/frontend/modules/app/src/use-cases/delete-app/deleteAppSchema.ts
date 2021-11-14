import { JSONSchemaType } from 'ajv'

export const deleteAppSchema: JSONSchemaType<Record<string, unknown>> = {
  title: 'Delete App',
  type: 'object',
  properties: {},
  required: [],
}
