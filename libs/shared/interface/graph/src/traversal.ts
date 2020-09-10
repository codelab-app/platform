import { NodeInterface } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export interface TraversalOrder<P extends Props = {}> {
  (node: NodeInterface<P>, iteratee: (node: NodeInterface<P>) => void)
}

export interface TraversalIteratee<P extends Props = {}> {
  (node: NodeInterface<P>): void
}
