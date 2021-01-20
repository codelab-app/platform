import { RequestValidationError } from '@codelab/backend'

export namespace DeletePageErrors {
  export class PageNotFoundError extends RequestValidationError {
    constructor(pageId: string) {
      super(`The page with id ${pageId} was not found`)
    }
  }
}
