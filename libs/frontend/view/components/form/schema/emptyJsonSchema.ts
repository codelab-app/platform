import type { JSONSchemaType } from 'ajv'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyJsonSchemaType {}

export const emptyJsonSchema: JSONSchemaType<EmptyJsonSchemaType> = {
  title: 'Empty Schema',
  type: 'object',
  properties: {},
  required: [],
}
