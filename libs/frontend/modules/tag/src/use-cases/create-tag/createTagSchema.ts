import { CreateTagInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<CreateTagInput> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    parentTagId: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
} as const
