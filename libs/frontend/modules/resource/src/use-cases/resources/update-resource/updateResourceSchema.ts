import { JSONSchemaType } from 'ajv'
import { CreateResourceInput, createResourceSchema } from '../create-resource'

export type UpdateResourceInput = CreateResourceInput

export const updateResourceSchema: JSONSchemaType<UpdateResourceInput> = {
  ...createResourceSchema,
  title: 'Update Resource Input',
} as const
