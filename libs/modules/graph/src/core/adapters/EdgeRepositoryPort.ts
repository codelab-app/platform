import { Option } from 'fp-ts/Option'
import { FindEdgeBy } from '../../common/CommonTypes'
import { Edge } from '../domain/edge'
import { Graph } from '../domain/graph/graph'

export interface EdgeRepositoryPort {
  createEdge(edge: Edge, graph?: Graph): Promise<Edge>
  deleteEdge(edge: Edge): Promise<Option<Edge>>
  deleteEdgesByVertexId(vertexId: string): Promise<Array<Edge>>
  updateEdge(edge: Edge): Promise<Edge>
  updateEdges(edges: Array<Edge>): Promise<Array<Edge>>
  exists(by: FindEdgeBy): Promise<boolean>
  findEdge(by: FindEdgeBy): Promise<Option<Edge>>
}
