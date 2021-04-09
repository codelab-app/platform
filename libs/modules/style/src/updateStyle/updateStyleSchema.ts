import { JSONSchemaType } from 'ajv'

export type UpdateStyleInput = {
  name: string
}

export const UpdateStyleSchema: JSONSchemaType<UpdateStyleInput> = {
  title: 'Update Style',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
