import { IEdge, IVertex } from '@codelab/shared/abstract/core'
import { Predicate } from './treePredicate'

export type NodeMapperFn<TVertex = IVertex, TOut = any> = (
  inNode: TVertex,
) => TOut

export interface BfsReduceInput<TVertex = IVertex, TEdge = IEdge, TOut = any> {
  /** A function that maps the existing vertex to the new one */
  nodeMapper: NodeMapperFn<TVertex, TOut>
  /** A function that adds the child to the new node */
  addChildToNode: AddChildToNodeFn<TVertex, TEdge, TOut>

  predicate?: Predicate<TVertex>
}

export type AddChildToNodeFn<TVertex, TEdge, TOut> = (
  parentNode: TOut,
  childNode: TOut,
  metadata: { edge: TEdge; parent: TVertex; child: TVertex },
) => void
