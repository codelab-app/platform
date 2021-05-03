import { JSONSchemaType } from 'ajv'

export type CreateComponentInput = {
  label: string
}

export const createComponentSchema: JSONSchemaType<CreateComponentInput> = {
  title: 'Create Component',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  required: ['label'],
} as const
