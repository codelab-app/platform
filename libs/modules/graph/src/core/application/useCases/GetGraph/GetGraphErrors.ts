import { RequestValidationError } from '@codelab/backend'

export namespace GetGraphErrors {
  export class GraphNotFoundError extends RequestValidationError {
    constructor(graphId: string) {
      super(`The graph with id ${graphId} was not found`)
    }
  }
}
