export class Result<T> {
  public isSuccess: boolean

  public isFailure: boolean

  private _errors?: T | string | Array<string>

  private _value?: T

  protected constructor(
    isSuccess: boolean,
    errors?: T | string | Array<string>,
    value?: T,
  ) {
    if (isSuccess && errors) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      )
    }

    if (!isSuccess && !errors) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this._errors = errors
    this._value = value

    Object.freeze(this)
  }

  get value(): T {
    if (!this.isSuccess) {
      console.log(this._errors)
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      )
    }

    return this._value as T
  }

  get errors() {
    if (Array.isArray(this._errors) && this._errors.length <= 1) {
      return this._errors[0]
    }

    return this._errors
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static fail<U>(error?: string | Array<string>): Result<U> {
    return new Result<U>(false, error)
  }

  /**
   * Returns first failure result
   *
   * @param results
   */
  public static combine(results: Array<Result<any>>): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result
    }

    return Result.ok()
  }
}
