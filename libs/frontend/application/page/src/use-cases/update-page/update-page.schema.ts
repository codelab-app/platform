import {
  appSchema,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-view/components'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export type UpdatePageSchema = Omit<IUpdatePageData, 'pageContentContainer'>

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
