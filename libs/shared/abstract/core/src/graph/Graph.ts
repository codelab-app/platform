import { Edge } from './Edge'
import { Vertex, VertexInput } from './Vertex'

export interface Graph<TVertex extends Vertex, TEdge extends Edge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}

export interface GraphInput<TVertex extends VertexInput, TEdge extends Edge> {
  vertices: ReadonlyArray<TVertex>
  edges: ReadonlyArray<TEdge>
}
