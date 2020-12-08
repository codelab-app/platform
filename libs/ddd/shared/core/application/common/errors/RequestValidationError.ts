export class RequestValidationError extends Error {
  /**
   * Used to bypass structural typing
   */
  public readonly _tag = 'REQUEST_VALIDATION_ERROR'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  public static throw(message?: string | Array<string>) {
    let msg = message

    if (Array.isArray(message)) {
      msg = message.length > 1 ? message.join('\n') : message[0]
    }

    throw new RequestValidationError(<string>msg)
  }
}
