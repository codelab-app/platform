'use client'

import type { IUpdateResourceData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import { createResourceSchema } from '../create-resource'

export const updateResourceSchema: JSONSchemaType<IUpdateResourceData> = {
  ...createResourceSchema,
  title: 'Update Resource Input',
}
