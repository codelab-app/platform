import type { IUpdateBaseElementData } from '@codelab/frontend/abstract/core'
import { IRenderTypeKind } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import { titleCaseValidation } from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementData> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
    renderIfExpression: {
      type: 'string',
      nullable: true,
      label: 'Render if',
    },
    renderForEachPropKey: {
      type: 'string',
      nullable: true,
      label: 'Render for each',
    },
    preRenderAction: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Pre Render action',
        },
      },
      required: ['id'],
    },
    postRenderAction: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Post Render action',
        },
      },
      required: ['id'],
    },
    renderType: {
      type: 'object',
      label: 'Render Type',
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
        kind: {
          type: 'string',
          enum: Object.values(IRenderTypeKind),
          label: 'Render Type',
        },
      },
      required: ['id', 'kind'],
    },
  },
  required: ['name'],
} as const
