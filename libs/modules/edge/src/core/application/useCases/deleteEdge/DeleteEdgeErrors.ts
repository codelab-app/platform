import { RequestValidationError } from '@codelab/backend'

export namespace DeleteEdgeErrors {
  export class EdgeNotFoundError extends RequestValidationError {
    constructor(id: string) {
      super(`Edge with id: ${id} was not found`)
    }
  }
}
