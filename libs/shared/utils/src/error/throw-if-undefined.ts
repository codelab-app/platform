import isNil from 'lodash/isNil'

export const throwIfUndefined = <T>(value: T | null | undefined) => {
  if (isNil(value)) {
    throw new Error('Value should not be undefined')
  }

  /**
   * Cast away undefined
   */
  return value as T
}
