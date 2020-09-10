import { curry } from 'ramda'
import {
  Curry,
  CurryReduce,
  hasChildren,
  HasChildren,
} from '@codelab/shared/interface/node'

export function treeReduce<T extends HasChildren<T>, R>(
  childrenKey = 'children',
): Curry<CurryReduce<T, R>> {
  return curry<CurryReduce<T, R>>((reducerFn: Function, init: R, node: T) => {
    const acc = reducerFn(init, node)

    if (!hasChildren(node, childrenKey)) {
      return acc
    }

    return node[childrenKey]?.reduce(
      treeReduce<HasChildren<T>, R>(childrenKey)(reducerFn),
      acc,
    )
  })
}
