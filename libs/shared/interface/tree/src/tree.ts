import { Node } from '@codelab/core/node'
import { Props } from '@codelab/shared/interface/props'
import {
  NodeInterface,
  HasChildren,
  HasParent,
} from '@codelab/shared/interface/node'
import { Graph } from '@codelab/shared/interface/graph'

export type NodeIteratee<
  SubTree extends HasParent<TreeNode>,
  TreeNode extends HasChildren<TreeNode>
> = (acc: SubTree, curr: TreeNode, index: number) => SubTree

export interface TreeSubTreeAcc<N> extends HasParent<N> {
  subTree: N
  prev: N
  parent?: N
}

export interface GraphSubTreeAcc<N> extends TreeSubTreeAcc<N> {
  graph: Graph
}
