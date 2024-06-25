import {
  appSchema,
  hideField,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
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
