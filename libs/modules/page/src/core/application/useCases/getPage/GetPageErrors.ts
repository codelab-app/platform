import { RequestValidationError } from '@codelab/backend'

export namespace GetPageErrors {
  export class PageNotFoundError extends RequestValidationError {
    constructor(pageId: string) {
      super(`The page with id ${pageId} has not been found`)
    }
  }
}
