import { RequestValidationError } from '@codelab/backend'

export namespace GetGraphErrors {
  export class GraphNotFoundError extends RequestValidationError {}
}
