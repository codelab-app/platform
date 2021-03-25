import { NodeA } from '@codelab/frontend'

export interface NodeFactory<R, T extends NodeA = NodeA> {
  (node: T): R
}
