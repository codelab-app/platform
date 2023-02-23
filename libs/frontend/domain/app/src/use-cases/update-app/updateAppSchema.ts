import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  singlySpacedTitleCaseWithNumbersRegex,
} from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
      pattern: singlySpacedTitleCaseWithNumbersRegex.source,
      errorMessage: 'must be in Title Case',
    },
  },
  required: ['name'],
} as const
