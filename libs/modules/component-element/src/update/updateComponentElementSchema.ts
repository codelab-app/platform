import { JSONSchemaType } from 'ajv'

export type UpdateComponentElementInput = {
  label: string
  atom_id: string
}

export const updateComponentElementSchema: JSONSchemaType<UpdateComponentElementInput> = {
  title: 'Update Component Element Input',
  type: 'object',
  properties: {
    atom_id: {
      type: 'string',
    },
    label: {
      type: 'string',
    },
  },
  required: ['label', 'atom_id'],
} as const
