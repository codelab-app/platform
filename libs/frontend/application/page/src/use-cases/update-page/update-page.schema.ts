import type { IPageUpdateFormData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  appSchema,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'

export type UpdatePageSchema = Omit<IPageUpdateFormData, 'pageContentContainer'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchema> = {
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
  required: ['name', 'app'],
  title: 'Update Page Input',
  type: 'object',
} as const
