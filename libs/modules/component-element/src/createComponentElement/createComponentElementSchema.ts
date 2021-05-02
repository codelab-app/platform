import { JSONSchemaType } from 'ajv'

export type CreateComponentElementInput = {
  atom_id: string
}

export const createComponentElementSchema: JSONSchemaType<CreateComponentElementInput> = {
  title: 'Create Component Element Input',
  type: 'object',
  properties: {
    atom_id: {
      type: 'string',
    },
  },
  required: ['atom_id'],
} as const
