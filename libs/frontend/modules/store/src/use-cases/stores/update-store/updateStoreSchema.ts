import { JSONSchemaType } from 'ajv'
import { CreateStoreInput, createStoreSchema } from '../create-store'

export type UpdateStoreInput = CreateStoreInput

export const updateStoreSchema: JSONSchemaType<UpdateStoreInput> = {
  ...createStoreSchema,
  title: 'Update Store Input',
} as const
