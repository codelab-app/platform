import { RequestValidationError } from '@codelab/backend'

export namespace GetAppsErrors {
  export class DemoError extends RequestValidationError {
    constructor(value: string) {
      super(`The value ${value} has some errors`)
    }
  }
}
