/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { Props } from '@codelab/props'
import { findNode, NodeFinderAcc, NodeI } from '@codelab/node'
import { Node } from '../../../node/src/Node'
import { GraphSubTreeContext, TreeSubTreeContext } from '../tree/Tree.i'

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
