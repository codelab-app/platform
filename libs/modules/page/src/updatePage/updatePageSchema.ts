import { UpdatePageData } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'
import { createPageSchema } from '../createPage/createPageSchema'

export const updatePageSchema: JSONSchemaType<UpdatePageData> = {
  ...createPageSchema,
  title: 'Update Page Input',
}
