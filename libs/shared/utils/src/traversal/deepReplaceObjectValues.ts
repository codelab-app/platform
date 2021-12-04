export const deepReplaceObjectValues = <
  TIn extends Record<string, any> | Array<any> | undefined | null,
>(
  obj: TIn,
  fn: (value: any, key: string, innerObj: Record<string, any>) => any,
): TIn => {
  if (!obj) {
    return undefined as TIn
  }

  if (typeof obj !== 'object') {
    return undefined as TIn
  }

  if (Array.isArray(obj)) {
    return obj.map((itemValue) => deepReplaceObjectValues(itemValue, fn)) as TIn
  }

  const newObj: Record<string, any> = {}
  const entries = Object.entries(obj)

  for (const [key, value] of entries) {
    let newValue

    if (typeof value === 'object') {
      newValue = deepReplaceObjectValues(value, fn)
    } else {
      newValue = fn(value, key, obj)
    }

    newObj[key] = newValue
  }

  return newObj as TIn
}
