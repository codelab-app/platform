import type { IElementDto } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nullableIdSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'

export type ICreateElementDto = Pick<
  IElementDto,
  | 'id'
  | 'name'
  | 'parentElement'
  | 'postRenderActions'
  | 'preRenderActions'
  | 'prevSibling'
  | 'props'
  | 'renderType'
  | 'style'
  | 'tailwindClassNames'
>

export const createElementSchema: JSONSchemaType<ICreateElementDto> = {
  properties: {
    ...idSchema(),
    name: {
      type: 'string',
      ...titleCaseValidation,
    },
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
    postRenderActions: {
      nullable: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...idSchema({
            label: 'Post Render action',
          }),
        },
        required: [],
      },
    },
    preRenderActions: {
      nullable: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...idSchema({
            label: 'Pre Render action',
          }),
        },
        required: [],
      },
    },
    prevSibling: {
      nullable: true,
      properties: {
        ...nullableIdSchema({
          label: 'Prev Sibling',
        }),
      },
      required: [],
      type: 'object',
    },
    props: {
      label: '',
      properties: {
        ...idSchema(),
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
