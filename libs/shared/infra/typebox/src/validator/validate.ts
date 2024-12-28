import type { Static, TAnySchema } from '@sinclair/typebox'

import { NestedValidator } from './nested-validator'

export const validateAndClean = <T extends TAnySchema>(
  schema: T,
  values: unknown,
): Static<T> => {
  const validator = new NestedValidator(schema)

  return validator.validateAndCleanCopy(values as Readonly<unknown>)
}
