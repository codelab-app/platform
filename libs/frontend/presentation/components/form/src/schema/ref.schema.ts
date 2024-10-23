import type { IRef } from '@codelab/shared/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { showFieldOnDev } from './show-field-on-dev'

/**
 * This is used to allow user to assign reference
 */
export const refSchema = <T extends string>(
  key: T,
  {
    disabled = false,
    label,
    nullable = false,
    showFieldOndev = false,
  }?: {
    label?: string
    disabled?: boolean
    nullable?: boolean
    showFieldOnDev?: boolean
  },
) => {
  return {
    [key]: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label: options?.label,
          disabled: options?.disabled,
          nullable: options?.nullable,
          ...showFieldOnDev(),
        },
      },
      required: options?.nullable ? [] : ['id'],
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  } as unknown as PropertiesSchema<{ [P in T]: IRef }>
}
