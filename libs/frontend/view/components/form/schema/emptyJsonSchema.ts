import { JSONSchemaType } from 'ajv'

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyJsonSchemaType = {}

export const emptyJsonSchema: JSONSchemaType<EmptyJsonSchemaType> = {
  title: 'Empty Schema',
  type: 'object',
  properties: {},
  required: [],
}
