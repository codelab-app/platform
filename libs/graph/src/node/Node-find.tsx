import { Props } from '@codelab/props'
import { reduce } from 'lodash'
import { NodeFinderAcc } from './Node.i'
import { treeWalker } from '../traversal'
import { nodeFinderIteratee } from '../traversal/Traversal-iteratee'
import { Node } from './Node'

export function findNode<P extends Props = {}>(
  id: string | undefined,
  node: Node<P>,
): Node<P> {
  if (!node) {
    throw new Error(`Node is undefined`)
  }

  if (!id) {
    throw new Error(`id is undefined`)
  }

  if (node.id === id) {
    return node
  }

  return reduce<Node<P>, NodeFinderAcc<P>>(
    node?.children ?? [],
    treeWalker<NodeFinderAcc<P>, Node<P>>(null, nodeFinderIteratee),
    {
      node,
      found: null,
      id,
    },
  ).found
}
