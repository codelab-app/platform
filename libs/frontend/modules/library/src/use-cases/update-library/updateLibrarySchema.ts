import { JSONSchemaType } from 'ajv'

export type UpdateLibraryInput = {
  name: string
}

export const UpdateLibrarySchema: JSONSchemaType<UpdateLibraryInput> = {
  title: 'Update Library',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
}
