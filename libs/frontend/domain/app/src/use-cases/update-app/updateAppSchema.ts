import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'id'],
  title: 'Edit App Input',
  type: 'object',
} as const
