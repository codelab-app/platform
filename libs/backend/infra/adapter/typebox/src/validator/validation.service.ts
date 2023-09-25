import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { Typebox } from '@codelab/shared/infra/validation'
import { cLog } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import type { Static, TAnySchema, TObject, TUnion } from '@sinclair/typebox'
import type { ValidationException } from 'typebox-validators'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'

@Injectable()
export class ValidationService {
  constructor(private traceService: TraceService) {}

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
      if (Typebox.isUnionSchema(anySchema)) {
        const discriminatedValidator = new DiscriminatedUnionValidator(
          anySchema as TUnion<Array<TObject>>,
        )

        return discriminatedValidator.validateAndCleanCopy(
          values as Readonly<unknown>,
        )
      }

      return validator.validateAndCleanCopy(values as Readonly<unknown>)
    } catch (error) {
      // console.log(error, values)

      cLog(error as object)

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

      /**
       * Remove schema as it can get very long
       */
      this.traceService.addEvent(`Validation failed for ${anySchema.$id}`, {
        error: cleanedErrors,
        values,
      })

      if (error instanceof Error) {
        this.traceService.addJsonAttributes(`stack_trace: ${error.stack}`)
      }

      throw error
    }
  }
}