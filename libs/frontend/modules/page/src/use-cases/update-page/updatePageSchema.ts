import { JSONSchemaType } from 'ajv'
import { CreatePageData } from '../create-page/createPageSchema'

export type UpdatePageData = CreatePageData

export const updatePageSchema: JSONSchemaType<UpdatePageData> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
