import { Vertex } from '../domain/vertex'

export interface VertexRepositoryPort {
  createVertex(Vertex: Vertex): Promise<Vertex>
  findAll(): Promise<Array<Vertex>>
  // deleteVertex(Vertex: Vertex): Promise<Option<Vertex>>
  // updateVertex(existingVertex: Vertex, updatedVertex: Vertex): Promise<Vertex>
  // exists(by: FindVertexBy): Promise<boolean>
  // findVertex(by: FindVertexBy): Promise<Option<Vertex>>
}
