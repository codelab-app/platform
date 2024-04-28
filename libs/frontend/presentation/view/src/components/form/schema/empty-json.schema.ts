import type { JSONSchemaType } from 'ajv'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyJsonSchemaType {}

export const emptyJsonSchema: JSONSchemaType<EmptyJsonSchemaType> = {
  properties: {},
  required: [],
  title: 'Empty Schema',
  type: 'object',
}
