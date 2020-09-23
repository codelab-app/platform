/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import * as mongoose from 'mongoose'
import { schemaFactory } from '../../model/src/schema'
import { NodeEntity } from '@codelab/core/node'
import {
  Node,
  NodeA,
  NodeI,
  assertsModelA,
  assertsNode,
  isModelI,
  isSchemaI,
} from '@codelab/shared/interface/node'
import {
  GraphSubTreeAcc,
  ModelAcc,
  NodeFinderAcc,
  TraversalIteratee,
  TreeSubTreeAcc,
} from '@codelab/shared/interface/tree'

export const nodeFinderIteratee = (
  { id, parent, found }: NodeFinderAcc<NodeI>,
  child: NodeI,
): NodeFinderAcc<NodeI> => ({
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

/**
 * A factory that takes an iteratee
 */
export const modelCreationIteratee: TraversalIteratee<NodeI, ModelAcc> = (
  { name, schema, model }: ModelAcc,
  node: NodeI,
) => {
  if (isSchemaI(node)) {
    return { schema: schemaFactory(node) }
  }

  if (isModelI(node)) {
    assertsModelA(node)

    if (!schema) {
      throw new Error('Missing schema as children')
    }

    return {
      name: node.props.name,
      schema,
      model: mongoose.model(node.props.name, schema),
    }
  }

  return { name, schema, model }
}
