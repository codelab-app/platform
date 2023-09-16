import type { ICreateAppData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
  styleTypeSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<ICreateAppData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    ...styleTypeSchema,
    ...ownerSchema,
  },
  required: ['name', 'owner'],
  title: 'Create App Input',
  type: 'object',
} as const
