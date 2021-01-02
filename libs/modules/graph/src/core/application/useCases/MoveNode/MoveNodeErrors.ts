import { RequestValidationError } from '@codelab/backend'

export namespace MoveNodeErrors {
  export class GraphNotFoundError extends RequestValidationError {
    constructor(graphId: string) {
      super(`Graph with id: ${graphId} was not found`)
    }
  }
}
