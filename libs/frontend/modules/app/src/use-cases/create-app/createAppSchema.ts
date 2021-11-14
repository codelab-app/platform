import { JSONSchemaType } from 'ajv'
import { CreateAppMutationInput } from './types'

export const createAppSchema: JSONSchemaType<CreateAppMutationInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
