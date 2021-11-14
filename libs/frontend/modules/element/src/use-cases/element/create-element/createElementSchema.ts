import { JSONSchemaType } from 'ajv'
import { CreateElementMutationVariables } from '../../../graphql'

export type CreateElementSchema = Omit<
  CreateElementMutationVariables['input'],
  'childrenIds' | 'parentElementId'
> & {
  // in the input we don't require parentElementId, but in all purposes
  // of the CreateElementForm, it's strongly advisable to have a parent, otherwise we will
  // create a not attached element
  parentElementId: string
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
  required: ['parentElementId'],
}
