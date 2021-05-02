import { JSONSchemaType } from 'ajv'

export type CreateComponentElementInput = {
  label: string
  atom_id: string
}

export const createComponentElementSchema: JSONSchemaType<CreateComponentElementInput> = {
  title: 'Create Component Element Input',
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
