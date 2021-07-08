export class RecursiveTypeError extends Error {
  static DEFAULT_MESSAGE = `Type is recursive`

  name: string

  constructor(message: string = RecursiveTypeError.DEFAULT_MESSAGE) {
    super(message)
    this.name = this.constructor.name
  }
}
