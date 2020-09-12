import { Node } from '@codelab/core/node'

export interface TraversalOrder {
  (node: Node, iteratee: (node: Node) => void): void
}

export interface TraversalIteratee {
  (node: Node): void
}
