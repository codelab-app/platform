import type { IUpdateBaseElementData } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
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
    postRenderAction: {
      nullable: true,
      properties: {
        ...idSchema({ label: 'Post render action' }),
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
      label: 'Render Type',
      type: 'object',
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
              nullable: true,
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
              nullable: true,
            },
          },
          required: ['id'],
          type: 'object',
        },
      ],
    },
  },
  required: [],
  title: 'Update Element Input',
  type: 'object',
} as const
