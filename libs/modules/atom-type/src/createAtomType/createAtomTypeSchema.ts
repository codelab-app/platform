import { JSONSchemaType } from 'ajv'

export type CreateAtomTypeInput = {
  label: string
}

export const createAtomTypeSchema: JSONSchemaType<CreateAtomTypeInput> = {
  title: 'Create AtomType Input',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  required: ['label'],
} as const
