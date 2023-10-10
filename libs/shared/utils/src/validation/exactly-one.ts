import type { Nullish } from '@codelab/shared/abstract/types'
import { ValidationOptions } from './options'

export const containsExactlyOne = (items: Array<Nullish<object> | boolean>) => {
  const truthyCount = items.filter((item) => Boolean(item)).length

  return truthyCount === 1
}

export const assertContainsExactlyOne = (
  items: Array<Nullish<object> | boolean>,
  options: ValidationOptions,
) => {
  const exactlyOne = containsExactlyOne(items)

  if (!exactlyOne) {
    throw new Error(options.message)
  }
}
