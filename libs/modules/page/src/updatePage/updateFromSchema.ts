import { JSONSchemaType } from 'ajv'

export type UpdatePageInput = {
  name: string
}

export const UpdatePageSchema: JSONSchemaType<UpdatePageInput> = {
  title: 'Update Page',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
