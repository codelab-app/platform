import { JSONSchemaType } from 'ajv'

export type UpdateAtomInput = {
  atom_type_id: string
}

export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  title: 'Update Atom',
  type: 'object',
  properties: {
    atom_type_id: {
      type: 'string',
    },
  },
  required: ['atom_type_id'],
} as const
