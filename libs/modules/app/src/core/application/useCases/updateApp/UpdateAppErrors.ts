import { RequestValidationError } from '@codelab/backend'

export namespace UpdateAppErrors {
  export class AppNotFoundError extends RequestValidationError {}
}
