import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'
import { createAuthGuardSchema } from '../create-auth-guard'

export const updateAuthGuardSchema: JSONSchemaType<IUpdateAuthGuardData> = {
  ...createAuthGuardSchema,
  title: 'Update AuthGuard Input',
}
