import { IUpdateElementDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<IUpdateElementDTO> = {
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
