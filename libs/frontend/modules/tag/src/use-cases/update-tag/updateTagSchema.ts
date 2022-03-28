import { JSONSchemaType } from 'ajv'

export type UpdateTagInput = {
  name: string
}

export const updateTagSchema: JSONSchemaType<UpdateTagInput> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
