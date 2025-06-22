import type { IAuthGuardUpdateFormData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { createAuthGuardSchema } from '../create-auth-guard'

export const updateAuthGuardSchema: JSONSchemaType<IAuthGuardUpdateFormData> = {
  ...createAuthGuardSchema,
  title: 'Update Auth Guard Input',
}
