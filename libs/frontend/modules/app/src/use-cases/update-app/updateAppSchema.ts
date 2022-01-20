import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
