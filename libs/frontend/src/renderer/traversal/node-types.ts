import { NodeI } from '../../../modules/graph/src/core/domain/node/Node'

export interface NodeFactory<R, T extends NodeI = NodeI> {
  (node: T): R
}
