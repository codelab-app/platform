import { JSONSchemaType } from 'ajv'

export type DeleteAtomTypeInput = Record<string, unknown>

export const deleteAtomTypeSchema: JSONSchemaType<DeleteAtomTypeInput> = {
  title: 'Delete AtomType',
  type: 'object',
  properties: {},
  required: [],
}
