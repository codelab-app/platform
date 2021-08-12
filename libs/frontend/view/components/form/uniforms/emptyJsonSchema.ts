import { JSONSchemaType } from 'ajv'

export type EmptyJsonSchemaType = Record<string, unknown>

export const emptyJsonSchema: JSONSchemaType<EmptyJsonSchemaType> = {
  title: 'Empty Schema',
  type: 'object',
  properties: {},
  required: [],
}
