import { JSONSchemaType } from 'ajv'
import { UpdateComponentMutationVariables } from './UpdateComponent.api.graphql.gen'

export type UpdateComponentSchemaType =
  UpdateComponentMutationVariables['input']['updateData']

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
