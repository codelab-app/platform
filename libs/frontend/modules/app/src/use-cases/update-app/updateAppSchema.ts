import { JSONSchemaType } from 'ajv'
import { UpdateAppMutationInput } from './types'

export const updateAppSchema: JSONSchemaType<UpdateAppMutationInput> = {
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
