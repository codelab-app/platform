import { JSONSchemaType } from 'ajv'
import { DeleteTagsMutationVariables } from './DeleteTags.api.graphql'

export type DeleteTagsSchema = DeleteTagsMutationVariables['input']

export const deleteTagsSchema: JSONSchemaType<DeleteTagsSchema> = {
  title: 'Delete Tag Input',
  type: 'object',
  properties: {
    ids: {
      type: 'array',
      items: {
        type: 'string',
      },
      disabled: true,
    },
  },
  required: ['ids'],
}
