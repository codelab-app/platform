import { NodeA } from '@codelab/shared/interface/node'

export interface TraversalOrder {
  (node: NodeA, iteratee: (node: NodeA) => void): void
}
