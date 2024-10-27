import type { IRef } from '@codelab/shared/abstract/core'
import type {
  JSONSchemaType,
  PropertiesSchema,
} from 'ajv/dist/types/json-schema'

import { showFieldOnDev as showField } from './show-field-on-dev'

/**
 * This is used to allow user to assign reference
 */
export const refSchema = <T extends string>(
  key: T,
  options?: {
    label?: string
    disabled?: boolean
    showFieldOnDev?: boolean
  },
) => {
  const disabled = options?.disabled ?? false
  const label = options?.label

  const properties = {
    [key]: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label,
          disabled,
          ...(options?.showFieldOnDev ? showField() : {}),
        },
      },
      required: ['id'],
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  }

  return properties as unknown as PropertiesSchema<{
    [P in T]: IRef
  }>
}

export const refMaybeSchema = <T extends string>(
  key: T,
  options?: {
    label?: string
    disabled?: boolean
    showFieldOnDev?: boolean
  },
) => {
  const nullable = true
  const disabled = options?.disabled ?? false
  const label = options?.label

  const properties = {
    [key]: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label,
          disabled,
          nullable,
          ...(options?.showFieldOnDev ? showField() : {}),
        },
      },
      required: ['id'],
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  }

  return properties as unknown as PropertiesSchema<{
    [P in T]?: IRef
  }>
}
