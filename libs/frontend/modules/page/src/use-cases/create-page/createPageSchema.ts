import { ICreatePageDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageDTO> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    appId: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
