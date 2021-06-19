import {
  createFieldSchema,
  CreateFieldSchemaObject,
  CreateFieldTypeObject,
} from '../createField'

export type UpdateFieldTypeObject = CreateFieldTypeObject
export type UpdateFieldSchemaType = CreateFieldSchemaObject
export const updateFieldSchema = createFieldSchema
