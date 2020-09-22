import { NodeDtoA } from './dto'

export interface NodeFactory<R, T extends NodeDtoA = NodeDtoA> {
  (node: T): R
}
