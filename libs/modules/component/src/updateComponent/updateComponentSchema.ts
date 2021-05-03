import { JSONSchemaType } from 'ajv'

export type UpdateComponentInput = {
  label: string
}

export const updateComponentSchema: JSONSchemaType<UpdateComponentInput> = {
  title: 'Update Component',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  required: ['label'],
} as const
