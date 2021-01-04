import { Result } from './Result'

export class Validator {
  public static guardWithExceptions<T>(result: Result<T>) {
    if (result.isFailure) {
      throw new Error()
    }

    return result.value
  }
}
