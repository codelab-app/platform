import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Typebox } from '@codelab/shared/abstract/typebox'
import { cLog } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import type { Static, TAnySchema, TObject, TUnion } from '@sinclair/typebox'
import type { ValidationException } from 'typebox-validators'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'

@Injectable()
export class ValidationService {
  constructor(private loggerService: CodelabLoggerService) {}

  /**
   * Removes unrecognized properties from the validated data
   */
  validateAndClean = <T extends TAnySchema>(
    anySchema: T,
    values: unknown,
  ): Static<T> => {
    const validator = new Typebox.NestedValidator(anySchema)

    try {
      /**
       * Does additional check for discriminated union if is a union
       */
      if (Typebox.IsUnion(anySchema)) {
        const discriminatedValidator = new DiscriminatedUnionValidator(
          anySchema as TUnion<Array<TObject>>,
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
          ({ schema, ...detail }) => detail,
        ),
      }

      console.log('-------------------')
      console.log(values)
      cLog(cleanedErrors)

      /**
       * Remove schema as it can get very long
       */
      this.loggerService.error(`Validation failed for ${anySchema.$id}`, {
        error: cleanedErrors,
        values,
      })

      if (error instanceof Error) {
        this.loggerService.error(`stack_trace: ${error.stack}`)
      }

      throw error
    }
  }
}
