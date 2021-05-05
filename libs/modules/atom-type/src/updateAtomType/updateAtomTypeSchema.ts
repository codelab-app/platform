import { JSONSchemaType } from 'ajv'

export type UpdateAtomTypeInput = {
  label: string
}

export const updateAtomTypeSchema: JSONSchemaType<UpdateAtomTypeInput> = {
  title: 'Update AtomType',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  required: ['label'],
} as const
