import { JSONSchemaType } from 'ajv'

export type CreatePageInput = {
  name: string
}

export const createPageSchema: JSONSchemaType<CreatePageInput> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
