import { AppError } from './app-error'
import { ErrorCode } from './error-code'

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.NotFound, message ?? 'Not found')
  }
}
