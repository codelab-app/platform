import { JSONSchemaType } from 'ajv'

export type CreatePageElementInput = {
  component_id: string
  name: string
}

export const createPageElementSchema: JSONSchemaType<CreatePageElementInput> = {
  title: 'Create Page Element Input',
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
}
