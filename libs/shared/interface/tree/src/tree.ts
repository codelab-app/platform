import { Graph } from '@codelab/shared/interface/graph'
import {
  HasChildren,
  HasParent,
  NodeDtoI,
} from '@codelab/shared/interface/node'

export type NodeIteratee<
  SubTree extends HasParent<TreeNode>,
  TreeNode extends HasChildren<TreeNode>
> = (acc: SubTree, curr: TreeNode, index: number) => SubTree

export interface TreeSubTreeAcc<T extends NodeDtoI> extends HasParent<T> {
  subTree: T
  prev?: T
  parent?: T
}

export interface GraphSubTreeAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  graph: Graph
}

export interface NodeFinderAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found: T | undefined // found node
}
