/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { Props } from '@codelab/shared/interface/props'
import { Node } from '@codelab/core/node'
import {
  NodeFinderAcc,
  NodeI,
  NodeInterface,
} from '@codelab/shared/interface/node'
import {
  GraphSubTreeContext,
  TreeSubTreeContext,
} from '@codelab/shared/interface/tree'
import { reduce } from 'lodash'
import { treeWalker } from './traversal'

export function nodeFinderIteratee<P extends Props = {}>(
  { id, found, node }: NodeFinderAcc<P>,
  child: Node<P>,
) {
  if (!node || !id) {
    return null
  }

  if (child.id === id) {
    // eslint-disable-next-line no-param-reassign
    found = child
  }

  return {
    id,
    found,
    node,
  }
}

// This needs to be in tree/graph/traversal level, a node doesn't know how to find itself. plus findNode uses treeWalker methods which is just <traversal></traversal>
export function findNode<P extends Props = {}>(
  id: string | undefined,
  node: NodeInterface<P>,
): NodeInterface<P> | null {
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

export function treeAppenderIteratee<P extends Props>(
  { subTree, parent }: TreeSubTreeContext<P>,
  child: NodeI<P>,
) {
  const childNode = new Node<P>(child)
  const parentNode = findNode(parent.id, subTree)

  if (!parentNode) {
    throw Error(`Node of id ${parent?.id} not found`)
  }

  parentNode.addChild(childNode)

  return {
    prev: childNode,
    subTree,
  }
}

export function graphAppenderIteratee<P extends Props>(
  { graph, subTree, parent }: GraphSubTreeContext<P>,
  child: NodeI<P>,
) {
  const node = new Node<P>(child)
  const parentNode = findNode(parent?.id, subTree)

  graph.addVertexFromNode(node)
  graph.addEdgeFromNodes(parentNode, node)

  return {
    graph,
    subTree,
    parent,
    prev: node,
  }
}
