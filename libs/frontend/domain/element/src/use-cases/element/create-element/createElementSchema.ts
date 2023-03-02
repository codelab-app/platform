import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import { IRenderTypeModel } from '@codelab/frontend/abstract/core'
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
    prevSibling: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Linked by',
        },
      },
      required: ['id'],
    },
    customCss: {
      type: 'string',
      nullable: true,
    },
    guiCss: {
      type: 'string',
      nullable: true,
    },
    props: {
      type: 'object',
      nullable: true,
      properties: {
        data: {
          type: 'string',
        },
      },
      required: ['data'],
    },
    preRenderAction: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Pre Render action',
        },
      },
      required: ['id'],
    },
    postRenderAction: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Post Render action',
        },
      },
      required: ['id'],
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
          enum: Object.values(IRenderTypeModel),
          label: 'Render Type',
        },
      },
      required: ['id', 'model'],
    },
  },
  required: ['name', 'id'],
}
