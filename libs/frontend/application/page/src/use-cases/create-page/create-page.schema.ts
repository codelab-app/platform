import {
  appSchema,
  idSchema,
  nonEmptyString,
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
    url: {
      type: 'string',
      label: 'Deployed Page URL',
      help: 'Leave blank to autogenerate value',
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
