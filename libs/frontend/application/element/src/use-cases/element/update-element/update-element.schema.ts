import type { IUpdateBaseElementData } from '@codelab/frontend/abstract/domain'
import { getSelectElementComponent } from '@codelab/frontend/application/type'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

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
    postRenderAction: {
      nullable: true,
      properties: {
        id: {
          label: 'Post render action',
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
          label: 'Pre render action',
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    childMapperComponent: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Child Mapper Component',
        }),
      },
      required: [],
      type: 'object',
    },
    childMapperPreviousSibling: {
      nullable: true,
      properties: {
        ...idSchema({
          label: 'Render next to',
          component: getSelectElementComponent(ElementTypeKind.ChildrenOnly),
        }),
      },
      required: [],
      type: 'object',
    },
    childMapperPropKey: {
      label: 'Prop Key',
      nullable: true,
      type: 'string',
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
      oneOf: [
        {
          properties: {
            id: {
              type: 'string',
            },
            __typename: {
              enum: [IElementRenderTypeKind.Component],
              // label: 'Render Type',
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
              // label: 'Render Type',
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
