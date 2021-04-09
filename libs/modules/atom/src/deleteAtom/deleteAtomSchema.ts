import { JSONSchemaType } from 'ajv'

export type DeleteAtomInput = Record<string, unknown>

export const DeleteAtomSchema: JSONSchemaType<DeleteAtomInput> = {
  title: 'Delete Atom',
  type: 'object',
  properties: {},
  required: [],
}
