import { ICreatePreRenderDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createPreRenderSchema: JSONSchemaType<ICreatePreRenderDTO> = {
  title: 'Create Pre Render Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        preRender: () => null,
      },
    },
    code: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    pageId: {
      type: 'string',
    },
  },
  required: [],
}
