import type { IUpdateActionDTO } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { createActionSchema } from '../create-action'

export const updateActionSchema: JSONSchemaType<IUpdateActionDTO> = {
  ...createActionSchema,
  title: 'Update action',
} as const
