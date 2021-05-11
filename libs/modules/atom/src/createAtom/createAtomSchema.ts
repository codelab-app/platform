import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  label: string
  type: string
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
  },
  required: ['label', 'type'],
} as const
