import type { IRef } from '@codelab/shared/abstract/core'
import type {
  PartialSchema,
  PropertiesSchema,
} from 'ajv/dist/types/json-schema'

/**
 * This is used to allow user to assign reference
 */
export const refSchema = <T extends string>(key: T) => {
  return {
    [key]: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  } as unknown as PropertiesSchema<{ [P in T]: IRef }>
}
