import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  type: string
  library_id: string
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    library_id: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  required: ['type', 'library_id'],
} as const
