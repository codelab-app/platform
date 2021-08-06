import { AppError } from './AppError'
import { ErrorCode } from './ErrorCode'

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.NotFound, message ?? 'Not found')
  }
}
