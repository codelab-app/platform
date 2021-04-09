import { JSONSchemaType } from 'ajv'

export type DeleteStyleInput = Record<string, unknown>

export const DeleteStyleSchema: JSONSchemaType<DeleteStyleInput> = {
  title: 'Delete Style',
  type: 'object',
  properties: {},
  required: [],
}
