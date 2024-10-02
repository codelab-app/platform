import type { IElementDto } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'

export type ICreateElementDto = Pick<
  IElementDto,
  | 'id'
  | 'name'
  | 'parentElement'
  | 'postRenderAction'
  | 'preRenderAction'
  | 'prevSibling'
  | 'props'
  | 'renderType'
  | 'style'
  | 'tailwindClassNames'
>

export const createElementSchema: JSONSchemaType<ICreateElementDto> = {
  properties: {
    ...idSchema(),
    style: {
      nullable: true,
      type: 'string',
    },
    tailwindClassNames: {
      nullable: true,
      type: 'array',
      items: {
        type: 'string',
      },
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
          label: 'Prev Sibling',
        }),
      },
      required: ['id'],
      type: 'object',
    },
    props: {
      label: '',
      properties: {
        ...idSchema(),
        api: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
          required: ['id'],
          nullable: true,
        },
        data: {
          label: 'Props Data',
          type: 'string',
        },
      },
      type: 'object',
      required: ['id'],
    },
    renderType: {
      label: 'Render Type',
      oneOf: [
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Component],
              type: 'string',
            },
          },
          required: ['id'],
          type: 'object',
        },
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Atom],
              type: 'string',
            },
          },
          required: ['id'],
          type: 'object',
        },
      ],
    },
  },
  required: ['name', 'id'],
  title: 'Create Element Input',
  type: 'object',
}
