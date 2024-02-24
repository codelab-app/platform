import type { IUpdatePageFormData } from '@codelab/frontend/abstract/domain'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  pageUrlSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export type UpdatePageSchema = Omit<IUpdatePageFormData, 'pageContentContainer'>

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
