import { JSONSchemaType } from 'ajv'
import { DeleteTagsMutationVariables } from '../../graphql/tag.endpoints.graphql.gen'

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
      autoFocus: true,
    },
  },
  required: ['ids'],
}
