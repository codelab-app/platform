import type { IRef } from '@codelab/shared-abstract-core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { idSchema } from './id.schema'

/**
 * This is used to allow user to assign reference
 */
export const refSchema = <T extends string>(key: T, label: string) => {
  const properties = {
    [key]: {
      type: 'object',
      properties: idSchema,
      required: ['id'],
      label,
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  }

  return properties as unknown as PropertiesSchema<{
    [P in T]: IRef
  }>
}
