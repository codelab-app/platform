import { JSONSchemaType } from 'ajv'

export type CreateAppInput = {
  name: string
}

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
