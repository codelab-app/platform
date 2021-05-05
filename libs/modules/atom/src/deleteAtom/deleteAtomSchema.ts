import { JSONSchemaType } from 'ajv'

export type DeleteAtomInput = Record<string, unknown>

export const deleteAtomSchema: JSONSchemaType<DeleteAtomInput> = {
  title: 'Delete Atom',
  type: 'object',
  properties: {},
  required: [],
}
