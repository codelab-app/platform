export const encodeJson = (value: unknown) => {
  /**
   * Keep `null` or `string` values as is
   */
  if (value === null || typeof value === 'string') {
    return value
  }

  return JSON.stringify(value)
}
