import { JSONSchemaType } from 'ajv'
import { DeletePageMutationInput } from './types'

export const deletePageSchema: JSONSchemaType<DeletePageMutationInput> = {
  title: 'Delete Page',
  type: 'object',
  properties: {
    pageId: {
      type: 'string',
    },
  },
  required: [],
}
