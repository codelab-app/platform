import { HasChildren, HasParent } from '@codelab/shared/interface/node'
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

export interface NodeFinderAcc<N> extends HasParent<N> {
  node: N
  found: N | null // found node
  id: string // id we want to search for
  prev: undefined // not used, just to satisfy interface
}
