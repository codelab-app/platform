import { JSONSchemaType } from 'ajv'

export type UpdateAtomInput = {
  label: string
  type: string
}

export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  title: 'Update Atom',
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
