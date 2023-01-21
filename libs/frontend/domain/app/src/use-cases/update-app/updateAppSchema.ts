import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import { nonEmptyString } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    slug: {
      ...nonEmptyString,
      disabled: true,
      type: 'string',
    },
  },
  required: ['name', 'slug'],
} as const
