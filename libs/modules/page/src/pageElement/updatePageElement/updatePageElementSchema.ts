import { JSONSchemaType } from 'ajv'

export type UpdatePageElementInput = {
  name: string
  component_id: string
}

export const updatePageElementSchema: JSONSchemaType<UpdatePageElementInput> = {
  title: 'Update Component Element Input',
  type: 'object',
  properties: {
    component_id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: ['name', 'component_id'],
} as const
