import { RequestValidationError } from '@codelab/backend'

export namespace GetAppErrors {
  export class NotFound extends RequestValidationError {
    constructor(value: string) {
      super(`The app ${value} has not been found`)
    }
  }
}
