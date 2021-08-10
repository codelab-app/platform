import { DeleteTagInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const deleteTagSchema: JSONSchemaType<DeleteTagInput> = {
  title: 'Delete Tag Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: ['id'],
}
