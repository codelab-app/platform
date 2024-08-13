import { assertIsDefined } from '../assert/assert'

export const throwIfUndefined = <T>(value: T | null | undefined) => {
  assertIsDefined(value)
  // if (isNil(value)) {
  //   throw new Error('Value should not be undefined')
  // }

  /**
   * Cast away undefined
   */
  return value
}
