import { IUpdatePreRenderDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updatePreRenderSchema: JSONSchemaType<IUpdatePreRenderDTO> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
    },
    code: {
      autoFocus: true,
      type: 'string',
    },
    pageId: {
      autoFocus: true,
      type: 'string',
    },
    type: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: [],
}
