import { Props } from '@codelab/shared/interface'
import { reduce } from 'lodash'
import { treeWalker, nodeFinderIteratee } from '@codelab/graph'
import { NodeInterface, NodeFinderAcc } from '../base/Node.i'

export function findNode<P extends Props = {}>(
  id: string | undefined,
  node: NodeInterface<P>,
): NodeInterface<P> {
  if (!node) {
    throw new Error(`Node is undefined`)
  }

  if (!id) {
    throw new Error(`id is undefined`)
  }

  if (node.id === id) {
    return node
  }

  return reduce<NodeInterface<P>, NodeFinderAcc<P>>(
    node?.children ?? [],
    treeWalker<NodeFinderAcc<P>, NodeInterface<P>>(null, nodeFinderIteratee),
    {
      node,
      found: null,
      id,
    },
  ).found
}
