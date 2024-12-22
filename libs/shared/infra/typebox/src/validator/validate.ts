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
    /**
     * Does additional check for discriminated union if is a union
     */
    if (IsUnion(schema)) {
      const discriminatedValidator = new DiscriminatedUnionValidator(
        schema as TUnion<Array<TObject>>,
      )

      return discriminatedValidator.validateAndCleanCopy(
        values as Readonly<unknown>,
      )
    }

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

    console.error('Validation Error:', {
      errors: cleanedErrors,
      schema,
      values,
    })

    throw error
  }
}
