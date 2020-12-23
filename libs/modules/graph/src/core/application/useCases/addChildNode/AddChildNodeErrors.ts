import { RequestValidationError } from '@codelab/backend'

export namespace AddChildNodeErrors {
  export class DemoError extends RequestValidationError {
    constructor(value: string) {
      super(`The value ${value} has some errors`)
    }
  }

  export class GraphNotFoundError extends RequestValidationError {
    constructor(graphId: string) {
      super(`Graph with id: ${graphId} was not found`)
    }
  }

  export class VertexNotFoundError extends RequestValidationError {
    constructor(vertexId: string) {
      super(`Parent vertex with id ${vertexId} was not found`)
    }
  }
}
