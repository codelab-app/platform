export const findOrFail = <T>(
  array: Array<T> | undefined,
  predicate: (value: T, index: number, object: Array<T>) => boolean,
) => {
  const item = array?.find(predicate)

  if (item === undefined) {
    throw new Error('Item not found')
  }

  return item
}
