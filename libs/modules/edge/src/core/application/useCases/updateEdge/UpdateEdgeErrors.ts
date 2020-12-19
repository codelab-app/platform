import { RequestValidationError } from '@codelab/backend'

export namespace UpdateEdgeErrors {
  export class EdgeNotFoundError extends RequestValidationError {
    constructor(id: string) {
      super(`Edge with id: ${id} was not found`)
    }
  }
}
