import { MAX_TYPE_DEPTH } from '../constants'

export class OverlyNestedTypeError extends Error {
  static DEFAULT_MESSAGE = `Type too nested, max depth is ${MAX_TYPE_DEPTH}`

  name: string

  constructor(message: string = OverlyNestedTypeError.DEFAULT_MESSAGE) {
    super(message)
    this.name = this.constructor.name
  }
}
