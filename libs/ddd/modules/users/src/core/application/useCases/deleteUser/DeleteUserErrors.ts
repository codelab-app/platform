import { RequestValidationError } from '@codelab/ddd/backend'

export namespace DeleteUserErrors {
  export class UserNotFoundError extends RequestValidationError {
    constructor(email: string) {
      super(`Theres not email ${email} associated with any account`)
    }
  }
}
