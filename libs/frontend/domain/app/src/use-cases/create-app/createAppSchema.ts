import type { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<ICreateAppDTO> = {
  title: 'Create App Input',
  type: 'object',
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
} as const
