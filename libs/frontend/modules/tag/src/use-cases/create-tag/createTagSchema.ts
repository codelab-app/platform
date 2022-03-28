import { JSONSchemaType } from 'ajv'
import { CreateTagInput } from './types'

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
