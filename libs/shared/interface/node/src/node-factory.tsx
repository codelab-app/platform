import { NodeDtoI } from './dto'

export interface NodeFactory<R, T extends NodeDtoI = NodeDtoI> {
  (node: T): R
}
