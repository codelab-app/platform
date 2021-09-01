import { JSONSchemaType } from 'ajv'
import { CreatePageMutationVariables } from './CreatePage.api.graphql'

export type CreatePageSchemaType = Omit<
  CreatePageMutationVariables['input'],
  'appId'
>

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
