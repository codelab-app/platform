import { Nullable } from '@codelab/shared/abstract/types'
import { JSONSchemaType } from 'ajv'

export type UpdateElementInput = {
  name: Nullable<string>
  instanceOfComponentId: Nullable<string>
  atomId: Nullable<string>
  renderForEachPropKey: Nullable<string>
  renderIfPropKey: Nullable<string>
}

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
