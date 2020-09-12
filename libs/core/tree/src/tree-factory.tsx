/**
 * We construct a tree by traversing the tree data using the treeAppender strategy
 */

import { reduce } from 'lodash'
import { Node } from '@codelab/core/node'
import { TreeNodeI, NodeI } from '@codelab/shared/interface/node'
import { GraphSubTreeAcc, TreeSubTreeAcc } from '@codelab/shared/interface/tree'
import {
  treeWalker,
  graphAppenderIteratee,
  treeAppenderIteratee,
} from '@codelab/core/traversal'
import { Graph } from '@codelab/core/graph'

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

export function makeTree(input: NodeI): any {
  const root = new Node(input)
  const subTreeContext = {
    subTree: root,
    prev: root,
    parent: root,
  }

  return reduce<Node, TreeSubTreeAcc>(
    (input as Node)?.children ?? [],
    treeWalker<TreeSubTreeAcc>(root, treeAppenderIteratee),
    subTreeContext,
  ).subTree
}

/**
 * Using Vertex/Edge representation
 */
export function makeGraph(input: TreeNodeI): Graph {
  // Convert input to Node input structure first, nodeFinder requires Node representation
  const root = makeTree(input)
  const graph = new Graph({ vertices: [], edges: [] })
  const subTreeContext = {
    graph,
    subTree: root,
    parent: root,
    prev: root,
  }

  graph.addVertexFromNode(root)

  return reduce<Node, GraphSubTreeAcc>(
    (input as Node).children ?? [],
    treeWalker<GraphSubTreeAcc>(root, graphAppenderIteratee),
    subTreeContext,
  ).graph
}

// export function fromNodes<P extends Props = any>(
//   inputNodes: Array<Node>,
// ): Node {
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
