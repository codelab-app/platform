import { Props } from '@codelab/props'
import { NodeInterface } from '@codelab/graph'
import { HasChildren } from '../../../node/src/base/Node.i'
import { Graph } from '../graph/Graph.i'

export type NodeIteratee<SubTree, TreeNode extends HasChildren<TreeNode>> = (
  acc: SubTree,
  curr: TreeNode,
  index: number,
) => SubTree

export interface TreeSubTreeContext<P extends Props = any> {
  subTree: NodeInterface<P>
  prev: NodeInterface<P>
  parent: NodeInterface<P>
}

export interface GraphSubTreeContext<P extends Props>
  extends TreeSubTreeContext<P> {
  graph: Graph
}
