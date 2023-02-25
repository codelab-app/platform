import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import {
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
} as const
