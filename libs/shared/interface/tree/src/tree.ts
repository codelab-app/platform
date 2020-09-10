import { Props } from '@codelab/shared/interface/props'
import { NodeInterface, HasChildren } from '@codelab/shared/interface/node'
import { Graph } from '@codelab/shared/interface/graph'

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
