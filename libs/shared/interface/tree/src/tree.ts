import { NodeEntity } from '@codelab/core/node'
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

export interface TreeSubTreeAcc<N extends NodeDtoI, T extends NodeDtoI = N>
  extends HasParent<N> {
  root: T
  prev?: N
  parent?: N
}

export interface GraphSubTreeAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  graph: Graph
}

export interface NodeFinderAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found: T | undefined // found node
}

export interface Tree {
  current: NodeEntity
  root: NodeEntity
}
