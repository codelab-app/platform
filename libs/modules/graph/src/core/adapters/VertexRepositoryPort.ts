import { Option } from 'fp-ts/Option'
import { FindVertexBy } from '../../common/CommonTypes'
import { Graph } from '../domain/graph/graph'
import { Vertex } from '../domain/vertex'

export interface VertexRepositoryPort {
  createVertex(vertex: Vertex, graph?: Graph): Promise<Vertex>
  deleteVertex(vertexId: string): Promise<Option<Vertex>>
  updateVertex(vertex: Vertex): Promise<Option<Vertex>>
  exists(by: FindVertexBy): Promise<boolean>
  findVertex(by: FindVertexBy): Promise<Option<Vertex>>
}
