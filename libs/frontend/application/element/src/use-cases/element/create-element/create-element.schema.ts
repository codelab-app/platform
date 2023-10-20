import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<
  Pick<
    IElementDTO,
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
> = {
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
          label: 'Linked by',
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
      oneOf: [
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Component],
              label: 'Render Type',
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
              label: 'Render Type',
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
