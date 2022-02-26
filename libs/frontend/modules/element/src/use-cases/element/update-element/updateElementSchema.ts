import { JSONSchemaType } from 'ajv'
import { UpdateElementInput } from './types'

export const updateElementSchema: JSONSchemaType<UpdateElementInput> = {
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
      autoFocus: true,
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
    instanceOfComponentId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
  },
  required: [],
} as const
