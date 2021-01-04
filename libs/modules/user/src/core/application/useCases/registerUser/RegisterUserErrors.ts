import { RequestValidationError } from '@codelab/backend'

export namespace RegisterUserErrors {
  export class EmailAlreadyExistsError extends RequestValidationError {
    constructor(email: string) {
      super(`The email ${email} associated for this account already exists`)
    }
  }
}
