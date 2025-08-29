import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import { createPageSchema } from '../create-page/create-page.schema'

export type UpdatePageSchema = Omit<IPageUpdateFormData, 'pageContentContainer'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchema> = {
  ...createPageSchema,
  required: ['name', 'app', 'urlPattern'],
  title: 'Update Page Input',
  type: 'object',
} as const
