import { NodeI } from './dto'

export interface NodeFactory<R, T extends NodeI = NodeI> {
  (node: T): R
}
