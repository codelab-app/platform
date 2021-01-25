/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import { NodeEntity } from '@codelab/alpha/core/node'
import {
  Node,
  NodeA,
  NodeI,
  assertsNode,
} from '@codelab/alpha/shared/interface/node'
import {
  GraphSubTreeAcc,
  NodeFinderAcc,
  TraversalIteratee,
  TreeSubTreeAcc,
} from '@codelab/alpha/shared/interface/tree'

export const nodeFinderIteratee = (
  { id, parent, found }: NodeFinderAcc<NodeA>,
  child: NodeA,
): NodeFinderAcc<NodeA> => ({
  id,
  found: child.id === id ? child : found,
  parent,
})

// This needs to be in tree/graph/traversal level, a node doesn't know how to find itself. plus findNode uses treeWalker methods which is just <traversal></traversal>

// TODO: subTree does not change in both tree & graph functions, it stays as the root node and is used to hold reference to tree for findNode lookup

/**
 * treeWalker passes in a new parent at each level
 */

export const treeAppenderIteratee: TraversalIteratee<
  NodeI,
  TreeSubTreeAcc<NodeA>
> = ({ parent }: TreeSubTreeAcc<NodeA>, child: NodeI) => {
  assertsNode(parent as Node)

  /**
   * Since we removed passing children into treeWalker from tree-factory, or the initial call to treeWalker, the parent & the child are the same for the first pass.
   *
   * We simply return here and wait for treeWalker to call itself with the children passed in.
   *
   * You can think of the first iteratee as a noop, we simply are waiting for the recursive call.
   *
   * */
  if (parent?.id === child.id) {
    return {
      prev: parent,
    }
  }

  const node = new NodeEntity(child)

  ;(parent as Node).addChild(node)

  return {
    prev: node,
  }
}

export const graphAppenderIteratee: TraversalIteratee<
  NodeI,
  GraphSubTreeAcc<NodeI>
> = ({ graph, parent }: GraphSubTreeAcc<NodeI>, child: NodeI) => {
  const node = new NodeEntity(child)

  graph.addVertexFromNode(node)

  /**
   * The initial run now contains same parent & child, so we have to check when to add edges.
   */
  if (parent?.id !== child.id) {
    graph.addEdgeFromNodes(parent, node)
  }

  return {
    prev: node,
    graph,
  }
}
