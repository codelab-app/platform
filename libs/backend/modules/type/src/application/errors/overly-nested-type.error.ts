import { AppError, ErrorCode } from '@codelab/backend/abstract/core'
import { MAX_TYPE_DEPTH } from '../../domain/constants'

export class OverlyNestedTypeError extends AppError {
  static DEFAULT_MESSAGE = `Type too nested, max depth is ${MAX_TYPE_DEPTH}graphql-options`

  constructor(message: string = OverlyNestedTypeError.DEFAULT_MESSAGE) {
    super(ErrorCode.OverlyNestedType, message)
  }
}
