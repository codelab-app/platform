import { IEdge } from './IEdge'
import { IVertex } from './IVertex'

export interface IGraph<TVertex extends IVertex, TEdge extends IEdge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}
