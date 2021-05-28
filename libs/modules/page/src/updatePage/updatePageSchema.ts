import { UpdatePageData } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'

//Won't update appId for now, but might be useful in the future?
export type UpdatePageSchemaType = Omit<UpdatePageData, 'appId'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchemaType> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
