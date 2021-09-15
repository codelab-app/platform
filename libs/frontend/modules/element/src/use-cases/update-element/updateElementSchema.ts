import { JSONSchemaType } from 'ajv'
import { UpdateElementMutationVariables } from './UpdateElement.api.graphql.gen'

export type UpdateElementSchema =
  UpdateElementMutationVariables['input']['data']

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
    renderIfPropKey: {
      type: 'string',
      nullable: true,
      label: 'Render if',
    },
    renderForEachPropKey: {
      type: 'string',
      nullable: true,
      label: 'Render for reach',
    },
    css: {
      type: 'string',
      nullable: true,
    },
    propTransformationJs: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
} as const
