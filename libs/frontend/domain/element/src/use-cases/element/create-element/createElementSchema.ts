import type { ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { titleCaseValidation } from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<ICreateElementData> = {
  properties: {
    ...idSchema,
    customCss: {
      nullable: true,
      type: 'string',
    },
    guiCss: {
      nullable: true,
      type: 'string',
    },
    name: {
      type: 'string',
      ...titleCaseValidation,
    },
    parentElement: {
      nullable: true,
      properties: {
        id: {
          label: 'Parent element',
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
    postRenderAction: {
      nullable: true,
      properties: {
        id: {
          label: 'Post Render action',
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
    preRenderAction: {
      nullable: true,
      properties: {
        id: {
          label: 'Pre Render action',
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
    prevSibling: {
      nullable: true,
      properties: {
        id: {
          label: 'Linked by',
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
    props: {
      nullable: true,
      properties: {
        data: {
          nullable: true,
          type: 'string',
        },
      },
      type: 'object',
    },
    renderType: {
      label: 'Render Type',
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
        kind: {
          enum: Object.values(IRenderTypeKind),
          label: 'Render Type',
          type: 'string',
        },
      },
      required: ['id', 'kind'],
      type: 'object',
    },
  },
  required: ['name', 'id'],
  title: 'Create Element Input',
  type: 'object',
}
