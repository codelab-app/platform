import { JSONSchemaType } from 'ajv'
import { UpdateElementMutationVariables } from './UpdateElement.api.graphql'

export type UpdateElementSchema = Omit<
  UpdateElementMutationVariables['input']['data'],
  'css'
>

// css property is handled by the CSS tab
export const updateElementSchema: JSONSchemaType<UpdateElementSchema> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    atomId: {
      type: 'string',
      label: 'Atom',
      nullable: true,
    },
    componentId: {
      type: 'string',
      label: 'Component',
      nullable: true,
    },
    name: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
} as const
