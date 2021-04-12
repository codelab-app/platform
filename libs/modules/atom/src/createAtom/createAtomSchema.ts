import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  type: string
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
  },
  required: ['type'],
} as const
