import { JSONSchemaType } from 'ajv'

export type UpdateTagData = {
  name: string
}

export const updateTagSchema: JSONSchemaType<UpdateTagData> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
