import { IUpdateAppDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
