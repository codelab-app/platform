import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Edge } from '../../domain/edge/edge'
import { Graph } from '../../domain/graph/graph'
import { Vertex } from '../../domain/vertex/vertex'

export class GetGraphService {
  constructor(
    private readonly grpahRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async findAll(): Promise<Array<Graph>> {
    return this.grpahRepository.findAll()
  }

  async getEdgesByGraphId(graph_id: string): Promise<Array<Edge>> {
    return this.edgeRepository.findEdges({ graph_id })
  }

  async getVerticesByGraphId(graph_id: string): Promise<Array<Vertex>> {
    return this.vertexRepository.findVertices({ graph_id })
  }
}
