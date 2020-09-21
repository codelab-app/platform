import { Graph } from '@codelab/shared/interface/graph'
import {
  HasParent,
  Node,
  NodeDtoA,
  NodeDtoI,
} from '@codelab/shared/interface/node'

export type NodeIteratee<SubTree extends HasParent<T>, T extends NodeDtoA> = (
  acc: SubTree,
  curr: T,
  index?: number,
) => SubTree

export interface TreeSubTreeAcc<T extends NodeDtoI> extends HasParent<T> {
  prev?: T
  parent?: T
}

export interface GraphSubTreeAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  graph: Graph
}

export interface NodeFinderAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found?: T // found node
}

export interface Tree {
  current: Node
  root: Node
}
