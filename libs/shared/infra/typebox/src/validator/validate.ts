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

  try {
    return validator.validateAndCleanCopy(values as Readonly<unknown>)
  } catch (error) {
    const validationException = error as ValidationException

    /**
     * Remove schema from error
     */
    const cleanedErrors = {
      ...validationException,
      details: validationException.details.map(
        ({ schema: _, ...detail }) => detail,
      ),
    }

    console.error(
      'Validation Error:',
      JSON.stringify(
        {
          errors: cleanedErrors,
          schema,
        },
        null,
        2,
      ),
    )

    console.error(values)

    throw error
  }
}
