import { Graph } from '@codelab/alpha/shared/interface/graph'
import { HasParent, Node } from '@codelab/alpha/shared/interface/node'
import { NodeA, NodeI } from '@codelab/frontend'

export type TraversalIteratee<T extends NodeI, SubTree extends HasParent<T>> = (
  acc: SubTree,
  curr: T,
  index?: number,
) => SubTree

export type NodeIteratee<T extends NodeA = NodeA> = (node: T) => void

export interface TreeSubTreeAcc<T extends NodeI> extends HasParent<T> {
  prev?: T
  parent?: T
}

export interface GraphSubTreeAcc<T extends NodeI> extends TreeSubTreeAcc<T> {
  graph: Graph
}

export interface NodeFinderAcc<T extends NodeI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found?: T // found node
}

export interface Tree {
  current: Node
  root: Node
}
