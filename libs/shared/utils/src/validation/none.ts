import type { Nullish } from '@codelab/shared/abstract/types'

export const containsNone = (items: Array<Nullish<object> | boolean>) => {
  return !items.some((item) => Boolean(item))
}
