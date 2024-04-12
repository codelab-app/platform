import {
  appSchema,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { ICreatePageData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<Omit<ICreatePageData, 'kind'>> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    ...pageUrlSchema,
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
