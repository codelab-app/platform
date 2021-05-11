import { JSONSchemaType } from 'ajv'

export type CreatePageInput = {
  title: string
}

export const createPageSchema: JSONSchemaType<CreatePageInput> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
  },
  required: ['title'],
} as const
