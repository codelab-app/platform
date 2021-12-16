export const deepReplaceObjectValuesAndKeys = <
  TIn extends Record<string, any> | Array<any> | undefined | null,
>(
  obj: TIn,
  fn: (
    value: any,
    key: string,
    innerObj: Record<string, any>,
  ) => { key: string; value: string },
): TIn => {
  if (!obj) {
    return undefined as TIn
  }

  if (typeof obj !== 'object') {
    return undefined as TIn
  }

  if (Array.isArray(obj)) {
    return obj.map((itemValue) =>
      deepReplaceObjectValuesAndKeys(itemValue, fn),
    ) as TIn
  }

  const newObj: Record<string, any> = {}
  const entries = Object.entries(obj)

  for (const [key, value] of entries) {
    if (typeof value === 'object') {
      newObj[key] = deepReplaceObjectValuesAndKeys(value, fn)
    } else {
      const res = fn(value, key, obj)
      newObj[res.key] = res.value
    }
  }

  return newObj as TIn
}
