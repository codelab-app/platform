import { JSONSchemaType } from 'ajv'

export type CreateStoreInput = {
  name: string
}

export const createStoreSchema: JSONSchemaType<CreateStoreInput> = {
  title: 'Create Store',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
