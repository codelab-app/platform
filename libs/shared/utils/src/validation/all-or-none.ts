import type { Nullish } from '@codelab/shared/abstract/types'
import type { ValidationOptions } from './options'

export const containsAllOrNone = (items: Array<Nullish<object> | boolean>) => {
  const truthyCount = items.filter((item) => Boolean(item)).length

  return truthyCount === 0 || truthyCount === items.length
}

export const assertContainsAllOrNone = (
  items: Array<Nullish<object> | boolean>,
  options?: ValidationOptions,
) => {
  const allOrNone = containsAllOrNone(items)

  if (!allOrNone) {
    console.error(items)
    throw new Error(options?.message ?? 'Must contain all or none')
  }
}
