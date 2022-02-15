import { JSONSchemaType } from 'ajv'

export type UpdateTagSchema = {
  name: string
}

export const updateTagSchema: JSONSchemaType<UpdateTagSchema> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
