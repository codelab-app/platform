import type { IUpdateActionData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'
import { createActionSchema } from '../create-action'

export const updateActionSchema: JSONSchemaType<IUpdateActionData> = {
  ...createActionSchema,
  title: 'Update action',
} as const
