import type { IUpdateBaseElementData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      type: 'string',
      ...titleCaseValidation,
    },
    tailwindClassNames: {
      nullable: true,
      type: 'array',
      items: {
        type: 'string',
      },
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
    childMapperComponent: {
      nullable: true,
      properties: {
        id: {
          label: 'Child Mapper Component',
          type: 'string',
          help: 'The component to render based on the length of the data source',
        },
      },
      required: [],
      type: 'object',
    },
    childMapperPreviousSibling: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Render next to',
          help: 'Component instances will be rendered next to this element',
        }),
        // help: 'testing testing testing',
      },
      required: [],
      type: 'object',
    },
    childMapperPropKey: {
      label: 'Prop Key',
      nullable: true,
      type: 'string',
      help: 'The key used to get the data from state e.g. `state.products`, `rootState.products`. Data source needs to be an array',
    },
    renderForEachPropKey: {
      label: 'Render for each',
      nullable: true,
      type: 'string',
    },
    renderIfExpression: {
      label: 'Render if',
      nullable: true,
      type: 'string',
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
    // renderType: {
    //   label: 'Render Type',
    //   properties: {
    //     id: {
    //       type: 'string',
    //     },
    //     __typename: {
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       enum: Object.values(IElementRenderTypeKind),
    //       nullable: true,
    //       label: 'Render Type',
    //       type: 'string',
    //     },
    //   },
    //   required: ['id'],
    //   type: 'object',
    // },
  },
  required: ['renderType'],
  title: 'Update Element Input',
  type: 'object',
} as const
