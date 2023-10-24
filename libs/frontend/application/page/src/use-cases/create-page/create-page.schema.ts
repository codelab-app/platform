import type { ICreatePageData } from '@codelab/frontend/abstract/domain'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'
import { pageAuthGuardSchema } from './page-auth-guard.schema'

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
    ...pageAuthGuardSchema,
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
