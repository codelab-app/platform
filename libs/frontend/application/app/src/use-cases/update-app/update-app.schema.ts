'use client'

import type { IAppUpdateFormData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { createAppSchema } from '../create-app'

export const updateAppSchema: JSONSchemaType<IAppUpdateFormData> = {
  ...createAppSchema,
  title: 'Edit App Input',
} as const
