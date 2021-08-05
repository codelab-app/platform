import { UpdateComponentData } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

// Won't update appId for now, but might be useful in the future?
export type UpdateComponentSchemaType = UpdateComponentData

export const updateComponentSchema: JSONSchemaType<UpdateComponentSchemaType> =
  {
    title: 'Update Component Input',
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    required: ['name'],
  }
