import { JSONSchemaType } from 'ajv'

export type EmptyJsonSchemaType = Record<string, unknown>

export const emptyJsonSchema: JSONSchemaType<EmptyJsonSchemaType> = {
  title: 'Empty schema',
  type: 'object',
  properties: {},
  required: [],
}
