import { JSONSchemaType } from 'ajv'
import { CreateAppMutationVariables } from '../../graphql/app.endpoints.graphql.gen'

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
