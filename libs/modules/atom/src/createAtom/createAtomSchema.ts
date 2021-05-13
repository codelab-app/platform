import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  label: string
  type: string
  library_id: string
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    library_id: {
      type: 'string',
    },
  },
  required: ['label', 'type', 'library_id'],
} as const
