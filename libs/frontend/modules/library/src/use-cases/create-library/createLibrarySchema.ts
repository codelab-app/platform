import { JSONSchemaType } from 'ajv'

export type CreateLibraryInput = {
  name: string
}

export const createLibrarySchema: JSONSchemaType<CreateLibraryInput> = {
  title: 'Create Library Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
}
