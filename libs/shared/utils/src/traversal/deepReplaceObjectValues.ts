import { Nullish } from '@codelab/shared/abstract/types'
import { isObjectLike } from 'lodash'

export const deepReplaceObjectValues = <
  TIn extends Nullish<Record<string, any> | Array<any>>,
>(
  obj: TIn,
  fn: (value: any, key: string, innerObj: Record<string, any>) => any,
): TIn => {
  // for some reason react nodes/ Html elements objects are causing to much recursion
  if (
    !obj ||
    typeof obj !== 'object' ||
    (obj as any)['$$typeof'] ||
    obj instanceof HTMLElement
  ) {
    return undefined as TIn
  }

  if (Array.isArray(obj)) {
    return obj.map((itemValue) => deepReplaceObjectValues(itemValue, fn)) as TIn
  }

  obj = fn(obj, '', obj)

  if (typeof obj !== 'object' || !obj) {
    return obj
  }

  if (Array.isArray(obj)) {
    return deepReplaceObjectValues(obj, fn)
  }

  const newObj: Record<string, any> = {}
  const entries = Object.entries(obj)

  for (const [key, value] of entries) {
    let newValue

    if (isObjectLike(value)) {
      newValue = deepReplaceObjectValues(value, fn)
    } else {
      newValue = fn(value, key, obj)
    }

    newObj[key] = newValue
  }

  return newObj as TIn
}
