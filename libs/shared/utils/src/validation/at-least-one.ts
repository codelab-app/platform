import type { Nullish } from '@codelab/shared/abstract/types'
import type { ValidationOptions } from './options'

export const containsAtLeastOne = (
  items: Array<Nullish<object> | boolean | string>,
) => {
  return items.some((item) => Boolean(item))
}

export const assertContainsAtLeastOne = (
  items: Array<Nullish<object> | boolean | string>,
  options?: ValidationOptions,
) => {
  const exists = containsAtLeastOne(items)

  if (!exists) {
    throw new Error(options?.message ?? 'At least one item is required')
  }
}
