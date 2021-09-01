import { JSONSchemaType } from 'ajv'
import { CreateAppMutationVariables } from './CreateApp.api.graphql'

export type CreateAppInput = CreateAppMutationVariables['input']

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
