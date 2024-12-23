import type { Static, TAnySchema } from '@sinclair/typebox'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  NestedValidator,
  Typebox,
  validateAndClean,
} from '@codelab/shared/infra/typebox'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidationService {
  constructor(private loggerService: PinoLoggerService) {}

  validateAndClean = <T extends TAnySchema>(
    schema: T,
    values: unknown,
  ): Static<T> => {
    return validateAndClean(schema, values)
  }
}
