/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { reduce } from 'lodash'
import { treeWalker } from './traversal'
import { Node } from '@codelab/core/node'
import { NodeDtoA } from '@codelab/shared/interface/node'
import {
  GraphSubTreeAcc,
  NodeFinderAcc,
  TreeSubTreeAcc,
} from '@codelab/shared/interface/tree'

export const nodeFinderIteratee = (
  { id, found, subTree }: NodeFinderAcc<NodeDtoA>,
  child: NodeDtoA,
): NodeFinderAcc<NodeDtoA> => ({
  id,
  found: child.id === id ? child : found,
  subTree,
})

// This needs to be in tree/graph/traversal level, a node doesn't know how to find itself. plus findNode uses treeWalker methods which is just <traversal></traversal>
export const findNode = (
  id: string | undefined,
  node: NodeDtoA,
): NodeDtoA | undefined => {
  if (!node) {
    throw new Error(`Node is undefined`)
  }

  if (!id) {
    throw new Error(`id is undefined`)
  }

  if (node.id === id) {
    return node
  }

  return reduce<NodeDtoA, NodeFinderAcc<NodeDtoA>>(
    (node?.children ?? []) as Array<NodeDtoA>,
    treeWalker<NodeDtoA, NodeFinderAcc<NodeDtoA>>(
      undefined,
      nodeFinderIteratee,
    ),
    {
      found: undefined,
      id,
      subTree: node,
    },
  ).found
}

export const treeAppenderIteratee = (
  { subTree, parent }: TreeSubTreeAcc<NodeDtoA>,
  child: NodeDtoA,
) => {
  const childNode = new Node(child)
  const parentNode = findNode(parent?.id, subTree) as Node

  if (!parentNode) {
    throw Error(`Node of id ${parent?.id} not found`)
  }

  parentNode.addChild(childNode)

  return {
    prev: childNode,
    subTree,
  }
}

export const graphAppenderIteratee = (
  { graph, subTree, parent }: GraphSubTreeAcc<NodeDtoA>,
  child: NodeDtoA,
) => {
  const node = new Node(child)
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
