import { RequestValidationError } from '@codelab/backend'

export namespace GetEdgeErrors {
  export class EdgeNotFoundError extends RequestValidationError {
    constructor(id: string) {
      super(`Edge with id: ${id} was not found`)
    }
  }
}
