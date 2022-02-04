import { JSONSchemaType } from 'ajv'
import { CreateAppInput } from '../create-app'
import { UpdateAppInput } from './types'

export const updateAppSchema: JSONSchemaType<UpdateAppInput> = {
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
