import { CreateTagInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<CreateTagInput> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
