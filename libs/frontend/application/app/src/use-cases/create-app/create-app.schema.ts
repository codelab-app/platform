import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'
import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-view/components/form'

export const createAppSchema: JSONSchemaType<ICreateAppData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
  title: 'Create App Input',
  type: 'object',
} as const
