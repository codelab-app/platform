import { JSONSchemaType } from 'ajv'

export type CreateComponentInput = {
  library_id: string
  label: string
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
  },
  required: ['label', 'library_id'],
} as const
