import type { Static, TAnySchema } from '@sinclair/typebox'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Typebox } from '@codelab/shared/infra/typebox'
import { cLog } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidationService {
  constructor(private loggerService: CodelabLoggerService) {}

  validateAndClean = <T extends TAnySchema>(
    schema: T,
    values: unknown,
  ): Static<T> => {
    try {
      return Typebox.ValidateAndClean(schema, values)
    } catch (error) {
      this.loggerService.error(`Validation failed for ${schema.$id}`, {
        error,
        values,
      })

      if (error instanceof Error) {
        this.loggerService.error(`stack_trace: ${error.stack}`)
      }

      cLog(error)
      console.error(values)

      throw error
    }
  }
}
