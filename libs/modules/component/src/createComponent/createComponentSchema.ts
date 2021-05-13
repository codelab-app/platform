import { JSONSchemaType } from 'ajv'

export type CreateComponentInput = {
  library_id: string
  label: string
  atom_id: string
}

export const createComponentSchema: JSONSchemaType<CreateComponentInput> = {
  title: 'Create Component',
  type: 'object',
  properties: {
    library_id: {
      type: 'string',
    },
    label: {
      type: 'string',
    },
    atom_id: {
      type: 'string',
    },
  },
  required: ['label', 'library_id', 'atom_id'],
} as const
