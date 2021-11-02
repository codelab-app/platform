import { JSONSchemaType } from 'ajv'
import { CreateComponentMutationVariables } from './CreateComponent.web.graphql.gen'

export type CreateComponentSchemaType =
  CreateComponentMutationVariables['input']

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
