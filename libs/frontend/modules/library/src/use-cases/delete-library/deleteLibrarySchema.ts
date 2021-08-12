import { JSONSchemaType } from 'ajv'

export type DeleteLibraryInput = Record<string, unknown>

export const DeleteLibrarySchema: JSONSchemaType<DeleteLibraryInput> = {
  title: 'Delete Library',
  type: 'object',
  properties: {},
  required: [],
}
