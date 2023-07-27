import type { WithMaybeChildren } from './with-maybe-chilred.interface'

export const traverseTrees = <T, R>(
  trees: Array<WithMaybeChildren<T>>,
  fn: (item: WithMaybeChildren<T>) => WithMaybeChildren<R>,
): Array<WithMaybeChildren<R>> => {
  const loop = (item: WithMaybeChildren<T>): WithMaybeChildren<R> => {
    const result = fn(item)

    if (item.children) {
      return {
        ...result,
        children: item.children.map(loop),
      }
    }

    return result
  }

  return trees.map(loop)
}
