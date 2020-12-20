import { RequestValidationError } from '@codelab/backend'

export namespace CreateGraphErrors {
  export class DemoError extends RequestValidationError {
    constructor(value: string) {
      super(`The value ${value} has some errors`)
    }
  }
}
