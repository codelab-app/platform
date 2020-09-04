import { curry } from 'ramda'
import { Curry, CurryReduce, hasChildren } from '../../../node/src/Node.i'

export function treeReduce<T, R>(
  childrenKey = 'children',
): Curry<CurryReduce<T, R>> {
  return curry<CurryReduce<T, R>>((reducerFn: Function, init: R, node: T) => {
    const acc = reducerFn(init, node)

    if (!hasChildren(node, childrenKey)) {
      return acc
    }

    return node[childrenKey]?.reduce(
      treeReduce<T, R>(childrenKey)(reducerFn),
      acc,
    )
  })
}
