import { Option } from 'fp-ts/Option'
import { FindVertexBy } from '../../common/CommonTypes'
import { Vertex } from '../domain/vertex'

export interface VertexRepositoryPort {
  createVertex(vertex: Vertex): Promise<Vertex>
  findAll(): Promise<Array<Vertex>>
  deleteVertex(Vertex: Vertex): Promise<Option<Vertex>>
  updateVertex(existingVertex: Vertex, vertex: Vertex): Promise<Vertex>
  // exists(by: FindVertexBy): Promise<boolean>
  findVertex(by: FindVertexBy): Promise<Option<Vertex>>
  findVertices(by: FindVertexBy): Promise<Array<Vertex>>
}
