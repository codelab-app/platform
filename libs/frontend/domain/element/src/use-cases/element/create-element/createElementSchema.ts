import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import { titleCaseValidation } from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<ICreateElementData> = {
  title: 'Create Element Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      type: 'string',
      ...titleCaseValidation,
    },
    parentElement: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Parent element',
        },
      },
      required: ['id'],
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
  required: ['name', 'id'],
}
