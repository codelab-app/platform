import type { IUpdateAuthGuardSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { createAuthGuardSchema } from '../create-auth-guard'

export const updateAuthGuardSchema: IUpdateAuthGuardSchemaBuilder = (
  input,
) => ({
  ...createAuthGuardSchema(input),
  title: 'Update Auth Guard Input',
})
