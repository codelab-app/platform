import { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<any> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    tag: {
      type: 'string',
    },
  },
  required: [],
} as const
