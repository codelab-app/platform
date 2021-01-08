import { RequestValidationError } from '@codelab/backend'

export namespace CreatePageErrors {
  export class AppNotFoundError extends RequestValidationError {
    constructor(appId: string) {
      super(`The app with id ${appId} was not found`)
    }
  }
}
