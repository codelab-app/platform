import { Option } from 'fp-ts/Option'
import { ByEdgeCondition } from '../../common/QueryConditions'
import { Edge } from '../domain/edge'
import { Graph } from '../domain/graph'
import { RepositoryPort } from '@codelab/backend'

export abstract class EdgeRepositoryPort implements RepositoryPort<Edge> {
  abstract create(edge: Edge, graph: Graph): Promise<Edge>

  abstract delete(edge: Edge): Promise<Option<Edge>>

  abstract deleteEdgesByVertexId(vertexId: string): Promise<Array<Edge>>

  abstract update(edge: Edge): Promise<Edge>

  abstract updateMany(edges: Array<Edge>): Promise<Array<Edge>>

  abstract exists(by: ByEdgeCondition): Promise<boolean>

  abstract findOne(edge: ByEdgeCondition): Promise<Option<Edge>>

  abstract findMany(edges: ByEdgeCondition): Promise<Array<Edge>>
}
