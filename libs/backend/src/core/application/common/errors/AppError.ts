export class AppError extends Error {
  /**
   * Used to bypass structural typing
   */
  public readonly _tag = 'APP_ERROR'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
