import { RequestValidationError } from '@codelab/backend'

export namespace DeleteNodeErrors {
  export class VertexNotFound extends RequestValidationError {
    constructor(vertexId: string) {
      super(`Vertex with id: ${vertexId} was not found`)
    }
  }

  export class GraphNotFoundError extends RequestValidationError {
    constructor(graphId: string) {
      super(`Graph with id: ${graphId} was not found`)
    }
  }
}
