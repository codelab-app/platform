import { Option } from 'fp-ts/Option'
import {
  ByVertexCondition,
  ByVertexConditions,
} from '../../common/QueryConditions'
import { Graph } from '../domain/graph'
import { Vertex } from '../domain/vertex'
import { RepositoryPort } from '@codelab/backend'

export abstract class VertexRepositoryPort implements RepositoryPort<Vertex> {
  abstract create(vertex: Vertex, graph: Graph): Promise<Vertex>

  abstract delete(vertexId: string): Promise<Option<Vertex>>

  abstract update(vertex: Vertex): Promise<Option<Vertex>>

  abstract exists(by: ByVertexCondition): Promise<boolean>

  abstract findOne(vertex: ByVertexCondition): Promise<Option<Vertex>>

  abstract findMany(vertices: ByVertexConditions): Promise<Array<Vertex>>
}
