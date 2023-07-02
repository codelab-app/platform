import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<
  Omit<ICreateElementData, 'page' | 'parentComponent' | 'propTransformationJs'>
> = {
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
      required: [],
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
      required: [],
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
      label: '',
      nullable: true,
      properties: {
        data: {
          label: 'Props Data',
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
