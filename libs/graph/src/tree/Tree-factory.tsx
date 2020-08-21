/**
 * We construct a tree by traversing the tree data using the treeAppender strategy
 */
import { Props } from '@codelab/props'
import { reduce } from 'lodash'
import { treeWalker } from '../traversal'
import {
  graphAppenderIteratee,
  treeAppenderIteratee,
} from '../traversal/Traversal-iteratee'
import { NodeInterface, Node } from '../node'
import { GraphSubTreeContext, TreeSubTreeContext } from './Tree.i'
import { Graph } from '../graph'
import { TreeNodeI } from '../node/codec/Node-tree'
import { ReactNodeI } from '../node/codec/Node-react'

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
export function makeTree<P extends Props>(
  input: TreeNodeI<P> | ReactNodeI<P>,
): NodeInterface<P> {
  const root = new Node<P>(input)
  const subTreeContext = {
    subTree: root,
    prev: root,
    parent: root,
  }

  return reduce<TreeNodeI<P> | ReactNodeI<P>, TreeSubTreeContext<P>>(
    input?.children ?? [],
    treeWalker<TreeSubTreeContext<P>>(root, treeAppenderIteratee),
    subTreeContext,
  ).subTree
}

/**
 * Using Vertex/Edge representation
 */
export function makeGraph<P extends Props>(input: TreeNodeI<P>): Graph {
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

  return reduce<TreeNodeI<P>, GraphSubTreeContext<P>>(
    input.children ?? [],
    treeWalker<GraphSubTreeContext<P>>(root, graphAppenderIteratee),
    subTreeContext,
  ).graph
}

// export function fromNodes<P extends Props = any>(
//   inputNodes: Array<Node<P>>,
// ): Node<P> {
//   const nodes = inputNodes.map((inputNode) => new Node(inputNode))

//   return new Node()
//   // const root = new Node<P>(input)
//   // const subTreeAcc = {
//   //   subTree: root,
//   //   prev: root,
//   //   parent: root,
//   // }
//   // return reduce<DTONode<P>, TreeAcc<P>>(
//   //   root.dto.children,
//   //   treeWalker<TreeAcc<P>, DTONode<P>>(root.dto, treeAppenderIteratee),
//   //   subTreeAcc,
//   // ).subTree
// }
