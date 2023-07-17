import type { IUpdateBaseElementData } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      type: 'string',
      ...titleCaseValidation,
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
    childMapperComponent: {
      nullable: true,
      properties: {
        id: {
          label: 'Child Mapper Component',
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    childMapperPreviousSibling: {
      nullable: true,
      properties: {
        id: {
          label: 'Render next to',
          type: 'string',
          uniforms: {
            component: getSelectElementComponent(ElementTypeKind.ChildrenOnly),
          },
        },
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
  required: [],
  title: 'Update Element Input',
  type: 'object',
} as const
