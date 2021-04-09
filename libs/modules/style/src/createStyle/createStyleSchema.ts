import { JSONSchemaType } from 'ajv'

export type CreateStyleInput = {
  name: string
}

export const createStyleSchema: JSONSchemaType<CreateStyleInput> = {
  title: 'Create Style Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
