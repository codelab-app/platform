import * as mongoose from 'mongoose'
import { Graph } from '@codelab/shared/interface/graph'
import {
  HasParent,
  Node,
  NodeDtoA,
  NodeDtoI,
} from '@codelab/shared/interface/node'

export type TraversalIteratee<
  SubTree extends HasParent<T>,
  T extends NodeDtoI = NodeDtoI
> = (acc: SubTree, curr: T, index?: number) => SubTree

export type NodeIteratee<T extends NodeDtoA = NodeDtoA> = (node: T) => void

export interface TreeSubTreeAcc<T extends NodeDtoI> extends HasParent<T> {
  prev?: T
  parent?: T
}

export interface GraphSubTreeAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  graph: Graph
}

export interface ModelAcc<T extends NodeDtoI = NodeDtoI>
  extends TreeSubTreeAcc<T> {
  name?: string
  schema?: mongoose.Schema
  model?: mongoose.Model<mongoose.Document>
}

export interface NodeFinderAcc<T extends NodeDtoI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found?: T // found node
}

export interface Tree {
  current: Node
  root: Node
}
