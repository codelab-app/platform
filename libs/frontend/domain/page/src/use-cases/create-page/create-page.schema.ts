import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    ...appSchema,
    kind: {
      type: 'string',
      value: IPageKind.Regular,
    },
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
