import { JSONSchemaType } from 'ajv'

export type EditAppInput = {
  name: string
}

export const editAppSchema: JSONSchemaType<EditAppInput> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
