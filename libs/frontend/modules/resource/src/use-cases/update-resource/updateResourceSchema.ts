import { IUpdateResourceDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createResourceSchema } from '../create-resource'

export const updateResourceSchema: JSONSchemaType<IUpdateResourceDTO> = {
  ...createResourceSchema,
  title: 'Update Resource Input',
}
