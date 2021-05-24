import { JSONSchemaType } from 'ajv'

export type DeletePropInput = Record<string, unknown>

export const deletePropSchema: JSONSchemaType<DeletePropInput> = {
  title: 'Delete Prop',
  type: 'object',
  properties: {},
  required: [],
}
