import { JSONSchemaType } from 'ajv'
import {
  CreateOperationInput,
  createOperationSchema,
} from '../create-operation'

export type UpdateOperationInput = CreateOperationInput

export const updateOperationSchema: JSONSchemaType<UpdateOperationInput> = {
  ...createOperationSchema,
  title: 'Update Operation Input',
} as const
