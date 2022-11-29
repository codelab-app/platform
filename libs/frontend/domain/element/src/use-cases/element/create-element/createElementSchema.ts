import { ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<ICreateElementDTO> = {
  title: 'Create Element Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    name: {
      autoFocus: true,
      type: 'string',
      nullable: true,
    },
    slug: {
      type: 'string',
    },
    parentElementId: {
      type: 'string',
      nullable: true,
      label: 'Parent element',
    },
    prevSiblingId: {
      type: 'string',
      nullable: true,
      label: 'Linked by',
    },
    atomId: {
      type: 'string',
      nullable: true,
      label: 'Atom',
    },
    renderComponentTypeId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
    customCss: {
      type: 'string',
      nullable: true,
    },
    guiCss: {
      type: 'string',
      nullable: true,
    },
    propsData: {
      type: 'string',
      nullable: true,
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
  required: ['slug'],
}
