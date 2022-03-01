import { JSONSchemaType } from 'ajv'

export type UpdateAppInput = {
  name: string
}

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
