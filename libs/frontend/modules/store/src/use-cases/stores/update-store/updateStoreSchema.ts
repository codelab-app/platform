import { IUpdateStoreDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createStoreSchema } from '../create-store'

export const updateStoreSchema: JSONSchemaType<IUpdateStoreDTO> = {
  ...createStoreSchema,
  title: 'Update Store Input',
} as const
