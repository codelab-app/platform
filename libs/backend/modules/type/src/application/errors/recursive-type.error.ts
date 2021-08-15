import { AppError, ErrorCode } from '@codelab/backend/infra'

export class RecursiveTypeError extends AppError {
  constructor(message?: string) {
    super(ErrorCode.RecursiveType, message ?? 'Type is recursive')
  }
}
