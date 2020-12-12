import { NodeA } from '@codelab/alpha/shared/interface/node'

export interface TraversalOrder {
  (node: NodeA, iteratee: (node: NodeA) => void): void
}
