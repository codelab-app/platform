import { AppError, ErrorCode } from '@codelab/backend/abstract/core'

export class RecursiveTypeError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.RecursiveType, message ?? 'Type is recursive')
  }
}
