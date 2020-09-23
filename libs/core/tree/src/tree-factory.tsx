/**
 * We construct a tree by traversing the tree data using the treeAppender strategy
 */

import { reduce } from 'lodash'
import { modelCreationIteratee } from '../../traversal/src/traversal-iteratee'
import { Graph } from '@codelab/core/graph'
import { NodeEntity } from '@codelab/core/node'
import {
  graphAppenderIteratee,
  nodeFinderIteratee,
  treeAppenderIteratee,
  treeWalker,
} from '@codelab/core/traversal'
import {
  NodeA,
  NodeI,
  assertsID,
  assertsNodeA,
} from '@codelab/shared/interface/node'
import {
  GraphSubTreeAcc,
  ModelAcc,
  NodeFinderAcc,
  TreeSubTreeAcc,
} from '@codelab/shared/interface/tree'

/**
 * This method generates a non-binary tree given JSON input. Each input node is
 *
 * @param input - Input data with a tree-like structure, in JSON format.
 *
 * @returns Root `Node` of the `Tree`
 *
 * ```typescript
 * const tree = makeTree(data)
 * ```
 *
 */
export const makeTree = (data: NodeI): NodeA => {
  const root = new NodeEntity(data)

  treeWalker<NodeI, TreeSubTreeAcc<NodeI>>(treeAppenderIteratee, root)({}, data)

  return root
}

/**
 * Using Vertex/Edge representation
 */
export const makeGraph = (input: NodeI): Graph => {
  // Convert input to Node input structure first, nodeFinder requires Node representation
  const root = makeTree(input)
  const graph = new Graph({ vertices: [], edges: [] })
  const subTreeAcc = {
    prev: root,
    graph,
  }

  graph.addVertexFromNode(root)

  return reduce(
    input.children,
    treeWalker<NodeI, GraphSubTreeAcc<NodeI>>(graphAppenderIteratee, root),
    subTreeAcc,
  ).graph
}

/**
 * traversePostOrder doesn't allow us to use acc, so we reduce and build from bottom up. Since we won't need to worry about branching order for Models, we can do this.
 */
export const makeModel = (input: NodeI) => {
  const root = new NodeEntity(input)

  const acc = reduce(
    input.children,
    treeWalker<NodeI, ModelAcc<NodeI>>(modelCreationIteratee, root),
    {},
  )

  /* We need to call iteratee here because treeWalker doesn't apply the iteratee on the root. This way we process the root node as well.
   */
  return modelCreationIteratee(acc, root)
}

// TODO: needs to be optimized for traversal performance
export const findNode = (
  id: string | undefined,
  node: NodeA,
): NodeA | undefined => {
  assertsID(id)
  assertsNodeA(node)

  if (node.id === id) {
    return node
  }

  return reduce(
    node.children,
    treeWalker<NodeA, NodeFinderAcc<NodeA>>(nodeFinderIteratee),
    {
      id,
    },
  ).found
}

// export const fromNodes = <P extends Props = any>(
//   inputNodes: Array<Node>,
// ): Node => {
//   const nodes = inputNodes.map((inputNode) => new Node(inputNode))

//   return new Node()
//   // const root = new Node(input)
//   // const subTreeAcc = {
//   //   subTree: root,
//   //   prev: root,
//   //   parent: root,
//   // }
//   // return reduce<DTONode, TreeAcc>(
//   //   root.dto.children,
//   //   treeWalker<TreeAcc, DTONode>(root.dto, treeAppenderIteratee),
//   //   subTreeAcc,
//   // ).subTree
// }
