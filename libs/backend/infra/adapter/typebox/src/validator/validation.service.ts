import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { Typebox } from '@codelab/shared/infra/validation'
import { Injectable } from '@nestjs/common'
import type { TAnySchema, TObject, TUnion } from '@sinclair/typebox'
import type { ValidationException } from 'typebox-validators'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'
import { StandardValidator } from 'typebox-validators/standard'

@Injectable()
export class ValidationService {
  constructor(private traceService: TraceService) {}

  /**
   * Removes unrecognized properties from the validated data
   */
  validateAndClean = <T extends TAnySchema>(anySchema: T, values: unknown) => {
    const validator = new StandardValidator(anySchema)

    try {
      /**
       * Does additional check for discriminated union if is a union
       */
      if (Typebox.isUnionSchema(anySchema)) {
        const discriminatedValidator = new DiscriminatedUnionValidator(
          anySchema as TUnion<Array<TObject>>,
        )

        discriminatedValidator.validateAndClean(values)
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
