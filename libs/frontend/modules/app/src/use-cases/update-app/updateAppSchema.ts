import { JSONSchemaType } from 'ajv'
import { UpdateAppMutationVariables } from './UpdateApp.api.graphql'

export type UpdateAppSchema = UpdateAppMutationVariables['input']['data']

export const updateAppSchema: JSONSchemaType<UpdateAppSchema> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
