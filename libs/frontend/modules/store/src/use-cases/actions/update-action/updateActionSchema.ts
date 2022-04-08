import { JSONSchemaType } from 'ajv'
import { CreateActionInput, createActionSchema } from '../create-action'

export type UpdateActionInput = CreateActionInput

export const updateActionSchema: JSONSchemaType<UpdateActionInput> = {
  ...createActionSchema,
  title: 'Update Action Input',
} as const
