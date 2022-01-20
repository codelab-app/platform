import {
  CreateTagInput,
  UpdateTagInput,
} from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<CreateTagInput> = {
  title: 'Update Tag Input',
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
