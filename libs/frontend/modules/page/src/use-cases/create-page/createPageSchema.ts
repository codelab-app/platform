import { JSONSchemaType } from 'ajv'

export type CreatePageInput = {
  name: string
  appId: string
}

export const createPageSchema: JSONSchemaType<CreatePageInput> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    appId: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
