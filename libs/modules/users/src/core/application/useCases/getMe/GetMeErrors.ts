import { RequestValidationError } from '@codelab/backend'

export namespace GetMeErrors {
  export class UserNotFoundError extends RequestValidationError {
    constructor(userId: string) {
      super(`The user with user id: ${userId} was not found`)
    }
  }
}
