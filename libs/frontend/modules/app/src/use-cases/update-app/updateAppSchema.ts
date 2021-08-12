import { UpdateAppData } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<UpdateAppData> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
