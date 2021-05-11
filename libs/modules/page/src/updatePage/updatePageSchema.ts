import { JSONSchemaType } from 'ajv'
import {
  CreatePageInput,
  createPageSchema,
} from '../createPage/createPageSchema'

export type UpdatePageInput = CreatePageInput

export const updatePageSchema: JSONSchemaType<UpdatePageInput> = {
  ...createPageSchema,
  title: 'Update Page Input',
}
