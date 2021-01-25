import { Option } from 'fp-ts/Option'
import { Edge } from '../domain/edge/edge'
import { EdgeDTO } from '../domain/edge/edge.codec'
import { Graph } from '../domain/graph/graph'
import { VertexDTO } from '../domain/vertex/vertex.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class EdgeRepositoryPort implements RepositoryPort<Edge> {
  abstract create(edge: Edge, graph: Graph): Promise<Option<Edge>>

  abstract delete(where: EdgeDTO): Promise<Option<Edge>>

  abstract deleteMany(where: EdgeDTO & { vertex: VertexDTO }): Promise<number>

  // abstract deleteEdgesByVertexId(vertexId: string): Promise<Array<Edge>>

  abstract update(where: EdgeDTO, data: EdgeDTO): Promise<Option<Edge>>

  abstract updateMany(
    where: Array<EdgeDTO>,
    data: Array<EdgeDTO>,
  ): Promise<Array<Edge>>

  abstract exists(where: EdgeDTO): Promise<boolean>

  abstract findOne(where: EdgeDTO): Promise<Option<Edge>>

  // abstract findMany(where: EdgeDTO): Promise<Array<Edge>>
}
