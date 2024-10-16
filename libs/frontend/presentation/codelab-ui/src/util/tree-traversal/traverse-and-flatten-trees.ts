import { flat } from 'remeda'

import type { WithMaybeChildren } from './with-maybe-chilred.interface'

export const traverseAndFlattenTrees = <T, R>(
  trees: Array<WithMaybeChildren<T>>,
  fn: (item: WithMaybeChildren<T>) => R,
): Array<R> => {
  const loop = (item: WithMaybeChildren<T>): Array<R> => {
    const result = fn(item)

    if (item.children) {
      return [result, ...flat(item.children.map(loop))]
    }

    return [result]
  }

  return flat(trees.map(loop))
}
