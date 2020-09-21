/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { reduce } from 'lodash'
import { treeWalker } from './traversal'
import { NodeEntity } from '@codelab/core/node'
import {
  Node,
  NodeDtoA,
  isID,
  isNode,
  isNodeDtoA,
} from '@codelab/shared/interface/node'
import {
  GraphSubTreeAcc,
  NodeFinderAcc,
  TreeSubTreeAcc,
} from '@codelab/shared/interface/tree'

export const nodeFinderIteratee = (
  { id, parent, found }: NodeFinderAcc<NodeDtoA>,
  child: NodeDtoA,
): NodeFinderAcc<NodeDtoA> => ({
  id,
  found: child.id === id ? child : found,
  parent,
})

// This needs to be in tree/graph/traversal level, a node doesn't know how to find itself. plus findNode uses treeWalker methods which is just <traversal></traversal>

// TODO: needs to be optimized for traversal performance
export const findNode = (
  id: string | undefined,
  node: NodeDtoA,
): NodeDtoA | undefined => {
  isID(id)
  isNodeDtoA(node)

  if (node.id === id) {
    return node
  }

  return reduce<NodeDtoA, NodeFinderAcc<NodeDtoA>>(
    node.children,
    treeWalker<NodeDtoA, NodeFinderAcc<NodeDtoA>>(
      undefined,
      nodeFinderIteratee,
    ),
    {
      id,
    },
  ).found
}

// TODO: subTree does not change in both tree & graph functions, it stays as the root node and is used to hold reference to tree for findNode lookup

/**
 * treeWalker passes in a new parent at each level
 */
export const treeAppenderIteratee = (
  { parent }: TreeSubTreeAcc<NodeDtoA>,
  child: NodeDtoA,
) => {
  isNode(parent as Node)

  const childNode = new NodeEntity(child)

  ;(parent as Node).addChild(childNode)

  return {
    parent,
    prev: childNode,
  }
}

export const graphAppenderIteratee = (
  { graph, parent }: GraphSubTreeAcc<NodeDtoA>,
  child: NodeDtoA,
) => {
  const node = new NodeEntity(child)

  graph.addVertexFromNode(node)
  graph.addEdgeFromNodes(parent, node)

  return {
    parent,
    prev: node,
    graph,
  }
}
