import type { JSONSchemaType } from 'ajv'

export interface DeleteElementData {
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
