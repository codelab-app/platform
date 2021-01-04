import { RequestValidationError } from '@codelab/backend'

export namespace LoginUserErrors {
  export class UserNotFoundError extends RequestValidationError {
    constructor(email: string) {
      super(`Theres no email ${email} associated with any account`)
    }
  }

  export class WrongPasswordError extends RequestValidationError {
    constructor() {
      super(`Wrong Password`)
    }
  }
}
