export abstract class DomainValidationError extends Error {
  /**
   * Used to bypass structural typing
   */
  public readonly _tag = 'DOMAIN_VALIDATION_ERROR'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, DomainValidationError.prototype)
  }
}
