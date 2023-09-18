import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { ElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<
  Omit<ICreateElementData, 'page' | 'parentComponent'>
> = {
  properties: {
    ...idSchema(),
    style: {
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
        ...idSchema({
          label: 'Parent element',
        }),
      },
      required: ['id'],
      type: 'object',
    },
    postRenderAction: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Post Render action',
        }),
      },
      required: [],
      type: 'object',
    },
    preRenderAction: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Pre Render action',
        }),
      },
      required: [],
      type: 'object',
    },
    prevSibling: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Linked by',
        }),
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
          enum: Object.values(ElementRenderTypeKind),
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
