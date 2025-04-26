'use client'

import type { IRedirectUpdateFormData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { createRedirectSchema } from '../create-redirect'

export const updateRedirectSchema: JSONSchemaType<IRedirectUpdateFormData> = {
  ...createRedirectSchema,
  title: 'Update Redirect',
}
