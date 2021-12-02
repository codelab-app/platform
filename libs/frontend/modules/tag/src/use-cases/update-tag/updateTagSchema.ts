import { JSONSchemaType } from 'ajv'
import { UpdateTagMutationVariables } from '../../store/tag.endpoints.graphql.gen'

export type UpdateTagSchema = UpdateTagMutationVariables['input']['data']

export const updateTagSchema: JSONSchemaType<UpdateTagSchema> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
}
