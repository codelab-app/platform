import { NodeDtoA } from '@codelab/shared/interface/node'

export interface TraversalOrder {
  (node: NodeDtoA, iteratee: (node: NodeDtoA) => void): void
}

export interface TraversalIteratee {
  (node: NodeDtoA): void
}
