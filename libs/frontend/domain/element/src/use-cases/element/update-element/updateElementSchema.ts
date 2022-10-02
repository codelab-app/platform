import { IUpdateBaseElementDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementDTO> = {
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
    renderComponentTypeId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
    preRenderActionId: {
      type: 'string',
      label: 'Pre Render action',
      nullable: true,
    },
    postRenderActionId: {
      type: 'string',
      label: 'Post Render action',
      nullable: true,
    },
  },
  required: [],
} as const
