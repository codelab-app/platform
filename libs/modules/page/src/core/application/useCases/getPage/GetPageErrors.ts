import { RequestValidationError } from '@codelab/backend'

export namespace GetPageErrors {
  export class DemoError extends RequestValidationError {
    constructor(value: string) {
      super(`The value ${value} has some errors`)
    }
  }
}
