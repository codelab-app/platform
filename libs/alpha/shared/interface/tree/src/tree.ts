import * as mongoose from 'mongoose'
import { Graph } from '@codelab/alpha/shared/interface/graph'
import { HasParent, Node, NodeA, NodeI } from '@codelab/alpha/shared/interface/node'

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

export interface ModelAcc<T extends NodeI = NodeI> extends TreeSubTreeAcc<T> {
  name?: string
  schema?: mongoose.Schema
  model?: mongoose.Model<mongoose.Document>
}

export interface NodeFinderAcc<T extends NodeI> extends TreeSubTreeAcc<T> {
  id: string // id we want to search for
  found?: T // found node
}

export interface Tree {
  current: Node
  root: Node
}
