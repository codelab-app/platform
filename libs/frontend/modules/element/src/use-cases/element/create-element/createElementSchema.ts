import { JSONSchemaType } from 'ajv'
import { CreateElementMutationVariables } from '../../../graphql'

export type CreateElementSchema = Omit<
  CreateElementMutationVariables['input'],
  'childrenIds'
> & {
  componentId?: string | null
}

export const createElementSchema: JSONSchemaType<CreateElementSchema> = {
  title: 'Create Page Element Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true,
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
  },
  required: [],
}
