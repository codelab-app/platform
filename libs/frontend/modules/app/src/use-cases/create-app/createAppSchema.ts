import { JSONSchemaType } from 'ajv'
import { CreateAppInput } from './types'

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['name'],
}
