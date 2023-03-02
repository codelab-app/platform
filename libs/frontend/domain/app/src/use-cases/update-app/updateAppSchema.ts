import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
} as const
