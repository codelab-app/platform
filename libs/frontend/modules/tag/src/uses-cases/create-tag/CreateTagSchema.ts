import { JSONSchemaType } from 'ajv'
import { CreateTagMutationVariables } from './CreateTag.web.graphql.gen'

export type CreateTagSchema = CreateTagMutationVariables['input']

export const createTagSchema: JSONSchemaType<CreateTagSchema> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    parentTagId: {
      type: 'string',
      nullable: true,
    },
    isRoot: {
      type: 'boolean',
      nullable: true,
    },
  },
  required: ['name'],
}
