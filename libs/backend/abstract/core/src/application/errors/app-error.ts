import { ErrorCode } from './error-code'

export class AppError extends Error {
  constructor(public readonly code: ErrorCode, message?: string) {
    super(message ?? 'Not found')
  }
}
