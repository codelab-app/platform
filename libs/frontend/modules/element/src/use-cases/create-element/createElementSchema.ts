import { JSONSchemaType } from 'ajv'
import { CreateElementMutationVariables } from './CreateElement.api.graphql'

export type CreateElementSchema = CreateElementMutationVariables['input']

export const createElementSchema: JSONSchemaType<CreateElementSchema> = {
  title: 'Create Page Element Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true,
    },
    atomId: {
      type: 'string',
      nullable: true,
      label: 'Atom',
    },
    componentId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
    parentElementId: {
      type: 'string',
      nullable: true,
      label: 'Parent element',
    },
    order: {
      type: 'integer',
      nullable: true,
    },
  },
  required: [],
}
