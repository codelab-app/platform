import { JSONSchemaType } from 'ajv'

export type CreatePageData = {
  name: string
  appId: string
}

export const createPageSchema: JSONSchemaType<CreatePageData> = {
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
