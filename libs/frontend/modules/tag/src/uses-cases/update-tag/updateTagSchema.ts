import { JSONSchemaType } from 'ajv'
import { UpdateTagMutationVariables } from './UpdateTag.web.graphql.gen'

export type UpdateTagSchema = UpdateTagMutationVariables['input']['data']

export const updateTagSchema: JSONSchemaType<UpdateTagSchema> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
