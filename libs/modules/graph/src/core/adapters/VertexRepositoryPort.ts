import { Option } from 'fp-ts/Option'
import { Vertex } from '../domain/vertex/vertex'
import { VertexDTO, VertexVO } from '../domain/vertex/vertex.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class VertexRepositoryPort implements RepositoryPort<Vertex> {
  abstract create(vertex: VertexVO, graphId: string): Promise<Option<Vertex>>

  abstract delete(where: VertexDTO): Promise<Option<Vertex>>

  abstract update(where: VertexDTO, data: VertexDTO): Promise<Option<Vertex>>

  abstract exists(where: VertexDTO): Promise<boolean>

  abstract findOne(where: VertexDTO): Promise<Option<Vertex>>

  // abstract findMany(where: VertexDTO): Promise<Array<Vertex>>
}
