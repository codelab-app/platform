import { JSONSchemaType } from 'ajv'

export type DeleteElementData = {
  elementId: string
}

export const deleteElementSchema: JSONSchemaType<DeleteElementData> = {
  title: 'Delete Element',
  type: 'object',
  properties: {
    elementId: {
      type: 'string',
      disabled: true,
    },
  },
  required: ['elementId'],
}
