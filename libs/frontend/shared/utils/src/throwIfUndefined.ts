export const throwIfUndefined = <T>(value: T) => {
  if (value === undefined) {
    throw new Error('Value should not be undefined')
  }

  /**
   * Cast away undefined
   */
  return value!
}
