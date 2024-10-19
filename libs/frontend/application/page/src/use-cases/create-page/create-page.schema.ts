import type { JSONSchemaType } from 'ajv'

import {
  appSchema,
  hideField,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { type IPageCreateFormData, IPageKind } from '@codelab/shared/abstract/core'

export const createPageSchema: JSONSchemaType<IPageCreateFormData> = {
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
