import { CreatePageInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type CreatePageSchemaType = Omit<CreatePageInput, 'appId'>

export const createPageSchema: JSONSchemaType<CreatePageSchemaType> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
