import { UpdateElementData } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<UpdateElementData> = {
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
    // css property is handled by the CSS tab
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
