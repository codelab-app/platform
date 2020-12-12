import { Vertex } from './vertex'

export interface Edge {
  id: string
  start: Vertex
  end: Vertex
}
