import { Edge } from './edge'
import { Vertex } from './vertex'

export interface Graph {
  vertices: Array<Vertex>
  edges: Array<Edge>
}
