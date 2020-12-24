import { RequestValidationError } from '@codelab/backend'

export namespace CreatePageErrors {
  export class DemoError extends RequestValidationError {
    constructor(value: string) {
      super(`The value ${value} has some errors`)
    }
  }
}
