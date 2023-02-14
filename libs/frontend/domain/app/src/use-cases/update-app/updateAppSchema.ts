import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  spacedLowercaseAlphanumericRegex,
} from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
      pattern: spacedLowercaseAlphanumericRegex.source,
    },
  },
  required: ['name'],
} as const
