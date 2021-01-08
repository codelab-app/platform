import { RequestValidationError } from '@codelab/backend'

export namespace GetMeErrors {
  export class UserNotFoundError extends RequestValidationError {}
}
