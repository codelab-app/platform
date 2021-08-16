import { Edge } from './Edge'
import { Vertex } from './Vertex'

export interface Graph<TVertex extends Vertex, TEdge extends Edge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}
