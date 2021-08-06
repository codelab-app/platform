import { AppError, ErrorCode } from '@codelab/backend'

export class RecursiveTypeError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.RecursiveType, message ?? 'Type is recursive')
  }
}
