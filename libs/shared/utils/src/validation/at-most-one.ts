import type { Nullish } from '@codelab/shared/abstract/types'
import { ValidationOptions } from './options'

export const containsAtMostOne = (items: Array<Nullish<object> | boolean>) => {
  const truthyCount = items.filter((item) => Boolean(item)).length

  return truthyCount <= 1
}

export const assertContainsAtMostOne = (
  items: Array<Nullish<object> | boolean>,
  options?: ValidationOptions,
) => {
  const atMostOne = containsAtMostOne(items)

  if (!atMostOne) {
    throw new Error(options?.message ?? 'Can contain at most one')
  }
}
