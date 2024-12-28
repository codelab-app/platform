import type { Static, TAnySchema } from '@sinclair/typebox'

import { validateAndClean } from '@codelab/shared/infra/typebox'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidationService {
  validateAndClean = <T extends TAnySchema>(
    schema: T,
    values: unknown,
  ): Static<T> => {
    return validateAndClean(schema, values)
  }
}
