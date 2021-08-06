import { ErrorCode } from './ErrorCode'

export class AppError extends Error {
  constructor(public readonly code: ErrorCode, message?: string) {
    super(message ?? 'Not found')
  }
}
