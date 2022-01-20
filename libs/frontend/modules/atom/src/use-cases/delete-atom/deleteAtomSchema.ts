import { DeleteAtomInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const deleteAtomSchema: JSONSchemaType<DeleteAtomInput> = {
  title: 'Delete Atom',
  type: 'object',
  properties: {
    atomId: {
      type: 'string',
    },
  },
  required: [],
}
