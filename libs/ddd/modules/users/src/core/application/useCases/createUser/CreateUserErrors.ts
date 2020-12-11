import { RequestValidationError } from '@codelab/ddd/backend'

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends RequestValidationError {
    constructor(email: string) {
      super(`The email ${email} associated for this account already exists`)
    }
  }
}
