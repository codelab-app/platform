import { RequestValidationError } from '@codelab/backend'

export namespace CreateAppErrors {
  export class UserNotFoundError extends RequestValidationError {
    constructor(userId: string) {
      super(`The user with id ${userId} was not found`)
    }
  }
}
