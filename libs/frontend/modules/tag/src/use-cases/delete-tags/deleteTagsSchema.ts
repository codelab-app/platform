import { JSONSchemaType } from 'ajv'
import { DeleteTagsMutationInput } from './types'

export const deleteTagsSchema: JSONSchemaType<DeleteTagsMutationInput> = {
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
