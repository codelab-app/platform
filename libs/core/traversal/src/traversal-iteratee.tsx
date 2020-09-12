/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { Node } from '@codelab/core/node'
import { NodeFinderAcc } from '@codelab/shared/interface/node'
import { GraphSubTreeAcc, TreeSubTreeAcc } from '@codelab/shared/interface/tree'
import { reduce } from 'lodash'
import { treeWalker } from './traversal'

export const nodeFinderIteratee = (
  { id, found, node }: NodeFinderAcc<Node>,
  child: Node,
): NodeFinderAcc<Node> => ({
  id,
  found: child.id === id ? child : found,
  node,
  prev: undefined,
})

// This needs to be in tree/graph/traversal level, a node doesn't know how to find itself. plus findNode uses treeWalker methods which is just <traversal></traversal>
export function findNode(id: string | undefined, node: Node): Node | null {
  if (!node) {
    throw new Error(`Node is undefined`)
  }

  if (!id) {
    throw new Error(`id is undefined`)
  }

  if (node.id === id) {
    return node
  }

  return reduce<Node, NodeFinderAcc<Node>>(
    node?.children ?? [],
    treeWalker<NodeFinderAcc<Node>>(null, nodeFinderIteratee),
    {
      node,
      found: null,
      id,
      prev: undefined,
    },
  ).found
}

export function treeAppenderIteratee(
  { subTree, parent }: TreeSubTreeAcc<Node>,
  child: Node,
) {
  const childNode = new Node(child)
  const parentNode = findNode(parent?.id, subTree)

  if (!parentNode) {
    throw Error(`Node of id ${parent?.id} not found`)
  }

  parentNode.addChild(childNode)

  return {
    prev: childNode,
    subTree,
    parent: null,
  }
}

export function graphAppenderIteratee(
  { graph, subTree, parent }: GraphSubTreeAcc<Node>,
  child: Node,
) {
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
