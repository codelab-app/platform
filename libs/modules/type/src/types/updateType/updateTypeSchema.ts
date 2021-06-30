import { JSONSchemaType } from 'ajv'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
} from '../../shared'

export type UpdateTypeSchema = BaseTypeMutationSchema

export const updateTypeSchema: JSONSchemaType<UpdateTypeSchema> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name'],
}
