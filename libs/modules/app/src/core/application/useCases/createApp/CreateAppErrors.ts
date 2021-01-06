import { RequestValidationError } from '@codelab/backend'

export namespace CreateAppErrors {
  export class UserNotFoundError extends RequestValidationError {}
}
