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
  TreeSubTreeAcc<NodeI>,
  NodeI
> = ({ parent }: TreeSubTreeAcc<NodeI>, child: NodeI) => {
  assertsNode(parent as Node)

  const childNode = new NodeEntity(child)

  // console.debug(`Adding ${childNode?.id} to ${parent?.id}`)
  ;(parent as Node).addChild(childNode)

  return {
    prev: childNode,
  }
}

export const graphAppenderIteratee: TraversalIteratee<
  GraphSubTreeAcc<NodeI>,
  NodeI
> = ({ graph, parent }: GraphSubTreeAcc<NodeI>, child: NodeI) => {
  const node = new NodeEntity(child)

  graph.addVertexFromNode(node)
  graph.addEdgeFromNodes(parent, node)

  return {
    prev: node,
    graph,
  }
}

/**
 * A factory that takes an iteratee
 */
export const modelCreationIteratee: TraversalIteratee<
  ModelAcc<NodeI>,
  NodeI
> = ({ name, schema, model }: ModelAcc<NodeI>, node: NodeI) => {
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
