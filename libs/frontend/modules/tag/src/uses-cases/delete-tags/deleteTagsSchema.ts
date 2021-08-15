import { DeleteTagsInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const deleteTagsSchema: JSONSchemaType<DeleteTagsInput> = {
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
