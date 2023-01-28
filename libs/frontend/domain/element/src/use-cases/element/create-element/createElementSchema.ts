import type { ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { nonEmptyString } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

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
      type: 'string',
      nullable: true,
      pattern: '^[a-z0-9 ]+$',
    },
    slug: {
      ...nonEmptyString,
      disabled: true,
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
    renderType: {
      type: 'object',
      label: 'Render Type',
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
        model: {
          type: 'string',
          enum: Object.values(RenderTypeEnum),
          label: 'Render Type',
        },
      },
      required: ['id', 'model'],
    },
  },
  required: ['slug'],
}
