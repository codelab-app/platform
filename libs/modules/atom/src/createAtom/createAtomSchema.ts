import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  type: string
  library: string
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    library: {
      type: 'string',
    },
  },
  required: ['type', 'library'],
} as const
