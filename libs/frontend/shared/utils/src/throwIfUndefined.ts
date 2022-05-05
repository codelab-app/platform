export const throwIfUndefined = <T>(value: T | undefined) => {
  if (value === undefined) {
    throw new Error('Value should not be undefined')
  }

  /**
   * Cast away undefined
   */
  return value!
}
