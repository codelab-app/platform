import type {
  Static,
  TAnySchema,
  TObject,
  TSchema,
  TUnion,
} from '@sinclair/typebox'
import type { ValidationException } from 'typebox-validators'

import { Validator } from '@codelab/shared/infra/typebox'
import { cLog } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'

@Injectable()
export class ValidationService {
  /**
   * Removes unrecognized properties from the validated data
   */
  validateAndClean = <T extends TAnySchema>(
    anySchema: T,
    values: unknown,
  ): Static<T> => {
    return Validator.validateAndClean(anySchema, values)
  }
}
