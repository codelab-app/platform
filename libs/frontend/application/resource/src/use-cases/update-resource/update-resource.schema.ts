import type { IUpdateResourceData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'
import { createResourceSchema } from '../create-resource'

export const updateResourceSchema: JSONSchemaType<IUpdateResourceData> = {
  ...createResourceSchema,
  title: 'Update Resource Input',
}
