import { CreateTagInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<CreateTagInput> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    parentTagId: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
}
