/**
 * These callbacks are executed when visiting each Node during Tree traversal
 */
import * as mongoose from 'mongoose'
import { schemaFactory } from '../../model/src/schema'
import { NodeEntity } from '@codelab/core/node'
import {
  Node,
  NodeDtoA,
  NodeDtoI,
  assertModelI,
  isModelNode,
  isNode,
  isSchemaNode,
} from '@codelab/shared/interface/node'
import {
  GraphSubTreeAcc,
  ModelAcc,
  NodeFinderAcc,
  TraversalIteratee,
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

// TODO: subTree does not change in both tree & graph functions, it stays as the root node and is used to hold reference to tree for findNode lookup

/**
 * treeWalker passes in a new parent at each level
 */

export const treeAppenderIteratee: TraversalIteratee<
  TreeSubTreeAcc<NodeDtoI>,
  NodeDtoI
> = ({ parent }: TreeSubTreeAcc<NodeDtoI>, child: NodeDtoI) => {
  isNode(parent as Node)

  const childNode = new NodeEntity(child)

  // console.debug(`Adding ${childNode?.id} to ${parent?.id}`)
  ;(parent as Node).addChild(childNode)

  return {
    prev: childNode, // Used by treeWalker to determine parent for next set of nodes
  }
}

export const graphAppenderIteratee: TraversalIteratee<
  GraphSubTreeAcc<NodeDtoI>,
  NodeDtoI
> = ({ graph, parent }: GraphSubTreeAcc<NodeDtoI>, child: NodeDtoI) => {
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
  ModelAcc<NodeDtoI>,
  NodeDtoI
> = ({ name, schema, model }: ModelAcc<NodeDtoI>, node: NodeDtoI) => {
  if (isSchemaNode(node)) {
    return { schema: schemaFactory(node) }
  }

  if (isModelNode(node)) {
    assertModelI(node)

    if (!schema) {
      throw new Error('Missing schema as children')
    }

    return {
      name: node?.props?.name,
      schema,
      model: mongoose.model(node?.props.name, schema),
    }
  }

  return { name, schema, model }
}
