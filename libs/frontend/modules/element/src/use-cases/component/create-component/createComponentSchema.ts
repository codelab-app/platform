import { JSONSchemaType } from 'ajv'

export interface CreateComponentSchemaType {
  name: string
}

export const createComponentSchema: JSONSchemaType<CreateComponentSchemaType> =
  {
    title: 'Create Component Input',
    type: 'object',
    properties: {
      name: {
        autoFocus: true,
        type: 'string',
      },
    },
    required: ['name'],
  }
