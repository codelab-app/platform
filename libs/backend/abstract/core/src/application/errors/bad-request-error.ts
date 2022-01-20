import { AppError } from './app-error'
import { ErrorCode } from './error-code'

export class BadRequestError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.BadRequest, message ?? 'Bad requet')
  }
}
