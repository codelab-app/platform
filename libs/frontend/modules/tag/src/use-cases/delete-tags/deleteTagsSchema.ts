import { DeleteTagsInput } from '@codelab/shared/abstract/codegen'
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
      autoFocus: true,
    },
  },
  required: ['ids'],
}
