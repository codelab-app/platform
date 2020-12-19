import { RequestValidationError } from '@codelab/backend'

export namespace UpdateVertexErrors {
  export class VertexNotFoundError extends RequestValidationError {
    constructor(id: string) {
      super(`Vertex with ${id} was not found`)
    }
  }
}
