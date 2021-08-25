import { Edge } from './edge'
import { Vertex, VertexInput } from './vertex'

export interface Graph<TVertex extends Vertex, TEdge extends Edge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}

export interface GraphInput<TVertex extends VertexInput, TEdge extends Edge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}
