import type { Static, TAnySchema, TObject, TUnion } from '@sinclair/typebox'
import type { ValidationException } from 'typebox-validators'

import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'
import { StandardValidator } from 'typebox-validators/standard'

import { IsUnion } from '../schema/is-union'
import { NestedValidator } from './nested-validator'

export const validateAndClean = <T extends TAnySchema>(
  schema: T,
  values: unknown,
): Static<T> => {
  const validator = new NestedValidator(schema)

  return validator.validateAndCleanCopy(values as Readonly<unknown>)
}
