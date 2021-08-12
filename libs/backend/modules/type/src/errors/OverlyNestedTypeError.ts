import { AppError, ErrorCode } from '@codelab/backend/infra'
import { MAX_TYPE_DEPTH } from '../constants'

export class OverlyNestedTypeError extends AppError {
  static DEFAULT_MESSAGE = `Type too nested, max depth is ${MAX_TYPE_DEPTH}`

  constructor(message: string = OverlyNestedTypeError.DEFAULT_MESSAGE) {
    super(ErrorCode.OverlyNestedType, message)
  }
}
