import { Option } from 'fp-ts/Option'
import { FindEdgeBy } from '../../common/CommonTypes'
import { Edge } from '../domain/edge/edge'
import { Graph } from '../domain/graph/graph'

export interface EdgeRepositoryPort {
  createEdge(edge: Edge, graph?: Graph): Promise<Edge>
  findAll(): Promise<Array<Edge>>
  deleteEdge(edge: Edge): Promise<Option<Edge>>
  updateEdge(existingEdge: Edge, edge: Edge): Promise<Edge>
  // exists(by: FindEdgeBy): Promise<boolean>
  findEdge(by: FindEdgeBy): Promise<Option<Edge>>
  findEdges(by: FindEdgeBy): Promise<Array<Edge>>
}
