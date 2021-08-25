import { AppError, ErrorCode } from '@codelab/backend/abstract/types'

export class RecursiveTypeError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.RecursiveType, message ?? 'Type is recursive')
  }
}
