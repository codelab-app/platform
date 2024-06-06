import {
  idSchema,
  appSchema,
  hideField,
  nonEmptyString,
  titleCaseValidation,
  pageUrlSchema,
} from '@codelab/frontend-presentation-view/components/form'
import { type ICreatePageData, IPageKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    kind: {
      type: 'string',
      default: IPageKind.Regular,
      ...hideField,
    },
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
