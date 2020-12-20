import { RequestValidationError } from '@codelab/backend'

export namespace EditUserErrors {
  export class UserNotFoundError extends RequestValidationError {
    constructor(email: string) {
      super(`Theres no email ${email} associated with any account`)
    }
  }
}
