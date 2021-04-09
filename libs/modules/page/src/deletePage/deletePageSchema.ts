import { JSONSchemaType } from 'ajv'

export type DeletePageInput = Record<string, unknown>

export const DeletePageSchema: JSONSchemaType<DeletePageInput> = {
  title: 'Delete Page',
  type: 'object',
  properties: {},
  required: [],
}
