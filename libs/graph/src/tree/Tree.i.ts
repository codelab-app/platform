import { Props } from '@codelab/props'
import { Node } from '@codelab/graph'
import { HasChildren } from '../node/Node.i'
import { Graph } from '../graph/Graph.i'

export type NodeIteratee<SubTree, TreeNode extends HasChildren<TreeNode>> = (
  acc: SubTree,
  curr: TreeNode,
  index: number,
) => SubTree

export interface TreeSubTreeContext<P extends Props = any> {
  subTree: Node<P>
  prev: Node<P>
  parent: Node<P>
}

export interface GraphSubTreeContext<P extends Props>
  extends TreeSubTreeContext<P> {
  graph: Graph
}
