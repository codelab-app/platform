import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  atom_type_id: string
  library_id: string
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    library_id: {
      type: 'string',
    },
    atom_type_id: {
      type: 'string',
    },
  },
  required: ['atom_type_id', 'library_id'],
} as const
