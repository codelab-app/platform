import { JSONSchemaType } from 'ajv'
import { UpdateElementMutationVariables } from './UpdateElement.web.graphql.gen'

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
      label: 'Render for each',
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
