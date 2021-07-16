import { Edge } from './edge'
import { Vertex } from './vertex'

export interface Graph<TVertex extends Vertex, TEdge extends Edge> {
  vertices: Array<TVertex>
  edges: Array<TEdge>
}
