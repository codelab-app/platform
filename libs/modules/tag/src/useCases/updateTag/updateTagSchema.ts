import { UpdateTagData } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<UpdateTagData> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
