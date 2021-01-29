/**
 * We construct a tree by traversing the tree data using the treeAppender strategy
 */

import { reduce } from 'lodash'
import { Graph } from '@codelab/alpha/core/graph'
import { NodeEntity } from '@codelab/alpha/core/node'
import {
  graphAppenderIteratee,
  nodeFinderIteratee,
  treeAppenderIteratee,
  treeWalker,
} from '@codelab/alpha/core/traversal'
import {
  NodeA,
  NodeI,
  assertsID,
  assertsNodeA,
} from '@codelab/alpha/shared/interface/node'
import {
  GraphSubTreeAcc,
  NodeFinderAcc,
  TreeSubTreeAcc,
} from '@codelab/alpha/shared/interface/tree'

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
  const tree = new NodeEntity(data)

  treeWalker<NodeI, TreeSubTreeAcc<NodeA>>(treeAppenderIteratee, tree)(
    {},
    // Error arises when json data doesn't have id to check for root equality, we set the root id on the JSON so we can compare in the iteratee
    { ...data, id: tree.id },
  )

  return tree
}

/**
 * Using Vertex/Edge representation
 *
 * We create a Tree first, then use the tree to build the accumulator (which contains the Graph)
 */
export const makeGraph = (data: NodeI): Graph => {
  // Convert input to Node input structure first, nodeFinder requires Node representation
  const tree = makeTree(data)

  return treeWalker<NodeI, GraphSubTreeAcc<NodeI>>(graphAppenderIteratee, tree)(
    {
      prev: tree,
      graph: new Graph(),
    },
    data,
  ).graph
}

/**
 * traversePostOrder doesn't allow us to use acc, so we reduce and build from bottom up. Since we won't need to worry about branching order for Models, we can do this.
 *
 * In this case we need to build from bottom up, so calling reduce here works by building the children first.
 *
 * Ideally we can add a traverse
 */
// export const makeModel2 = (input: NodeI) => {
//   const root = makeTree(input)

//   return traversePostOrderReducer({})(modelCreationIteratee, root)
// }

/**
 * Alternative implementation
 */
// export const makeModel = (input: NodeI) => {
//   const root = new NodeEntity(input)

//   const acc = reduce(
//     input.children,
//     treeWalker<NodeI, ModelAcc>(modelCreationIteratee, root),
//     {},
//   )

//   /* We need to call iteratee here because treeWalker doesn't apply the iteratee on the root. This way we process the root node as well.
//    */
//   return modelCreationIteratee(acc, root)
// }

/**
 *
 * Searches for a Node in a Tree given a Node ID.
 *
 * @remarks
 * This should be used on a Tree built using {@link makeTree}
 *
 * @param id - The ID of the node we are searching for
 * @param node - The root Node of the Tree we will be searching from
 * @returns The node that we are looking for
 */
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
