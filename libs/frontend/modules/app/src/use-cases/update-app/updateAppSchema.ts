import { JSONSchemaType } from 'ajv'
import { CreateAppInput } from '../create-app'

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
