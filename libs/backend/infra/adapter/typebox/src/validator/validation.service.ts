import { Injectable } from '@nestjs/common'
import type { TAnySchema, TObject, TUnion } from '@sinclair/typebox'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'
import { StandardValidator } from 'typebox-validators/standard'
import { isUnionSchema } from '../schema/is-union'

@Injectable()
export class ValidationService {
  /**
   * Removes unrecognized properties from the validated data
   */
  validateAndClean = <T extends TAnySchema>(schema: T, values: unknown) => {
    const validator = new StandardValidator(schema)

    try {
      /**
       * Does additional check for discriminated union if is a union
       */
      if (isUnionSchema(schema)) {
        const discriminatedValidator = new DiscriminatedUnionValidator(
          schema as TUnion<Array<TObject>>,
        )

        discriminatedValidator.validateAndClean(values)
      }

      return validator.validateAndCleanCopy(values as Readonly<unknown>)
    } catch (error) {
      console.error(schema, values, error)
      throw error
    }
  }
}
