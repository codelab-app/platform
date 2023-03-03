import type { ICreateAppData } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import {
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<ICreateAppData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    ...ownerSchema,
  },
  required: ['name', 'owner'],
  title: 'Create App Input',
  type: 'object',
} as const
