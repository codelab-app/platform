import { CreateComponentInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type CreateComponentSchemaType = CreateComponentInput

export const createComponentSchema: JSONSchemaType<CreateComponentSchemaType> =
  {
    title: 'Create Component Input',
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    required: ['name'],
  } as const
