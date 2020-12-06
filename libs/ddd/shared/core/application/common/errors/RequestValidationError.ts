export abstract class RequestValidationError extends Error {
  /**
   * Used to bypass structural typing
   */
  public readonly _tag = 'REQUEST_VALIDATION_ERROR'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}
