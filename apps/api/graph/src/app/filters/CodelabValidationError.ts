export class CodelabValidationError extends Error {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, CodelabValidationError.prototype)
  }
}
