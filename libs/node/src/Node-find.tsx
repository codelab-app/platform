import { Props } from '@codelab/props'
import { reduce } from 'lodash'
import { NodeInterface, NodeFinderAcc } from './Node.i'
import { treeWalker } from '../../graph/src/traversal'
import { nodeFinderIteratee } from '../../graph/src/traversal/Traversal-iteratee'

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
