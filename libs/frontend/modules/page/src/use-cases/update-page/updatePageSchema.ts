import { JSONSchemaType } from 'ajv'
import { UpdatePageMutationVariables } from '../page.endpoints.graphql.gen'

// Won't update appId for now, but might be useful in the future?
export type UpdatePageSchemaType = Omit<
  UpdatePageMutationVariables['input']['updateData'],
  'appId'
>

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
