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
    isRoot: {
      type: 'boolean',
      nullable: true,
    },
  },
  required: ['name'],
}

export type CreateTagSchema = typeof createTagSchema
