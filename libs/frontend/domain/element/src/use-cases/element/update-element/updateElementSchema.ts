import type { IUpdateBaseElementDTO } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { spacedLowercaseAlphanumericRegex } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateElementSchema: JSONSchemaType<IUpdateBaseElementDTO> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
      // pattern: spacedLowercaseAlphanumericRegex.source,
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
    preRenderActionId: {
      type: 'string',
      label: 'Pre Render action',
      nullable: true,
    },
    postRenderActionId: {
      type: 'string',
      label: 'Post Render action',
      nullable: true,
    },
    renderType: {
      type: 'object',
      label: 'Render Type',
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
        model: {
          type: 'string',
          enum: Object.values(RenderTypeEnum),
          label: 'Render Type',
        },
      },
      required: ['id', 'model'],
    },
  },
  required: ['name'],
} as const
