import { JSONSchemaType } from 'ajv'
import { DeleteAtomMutationInput } from './types'

export const deleteAtomSchema: JSONSchemaType<DeleteAtomMutationInput> = {
  title: 'Delete Atom',
  type: 'object',
  properties: {
    atomId: {
      type: 'string',
    },
  },
  required: [],
}
