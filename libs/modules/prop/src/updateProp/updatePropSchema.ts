import { JSONSchemaType } from 'ajv'
import { CreatePropInput, createPropSchema } from '../createProp'

export type UpdatePropInput = CreatePropInput

export const updatePropSchema: JSONSchemaType<UpdatePropInput> = {
  title: 'Update Prop Input',
  type: 'object',
  properties: createPropSchema.properties,
  required: createPropSchema.required,
} as const
