import { plainToClass } from 'class-transformer'
import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { SerializedEdgeDto } from '../../domain/edge/dto/SerializedEdgeDto'
import { Edge } from '../../domain/edge/edge'
import { Graph } from '../../domain/graph/graph'
import { Vertex } from '../../domain/vertex/vertex'
import { AddChildNodeErrors } from '../useCases/addChildNode/AddChildNodeErrors'
import { AddChildNodeRequest } from '../useCases/addChildNode/AddChildNodeRequest'
import { AddChildNodeResponse } from '../useCases/addChildNode/AddChildNodeResponse'
import { AddChildNodeUseCase } from '../useCases/addChildNode/AddChildNodeUseCase'
import { Result } from '@codelab/backend'

export class AddChildNodeService implements AddChildNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async execute(request: AddChildNodeRequest): Promise<AddChildNodeResponse> {
    const { graphId, parentVertexId, order } = request
    const newVertex = request.vertex
    const error = left(new AddChildNodeErrors.GraphNotFoundError(graphId))

    let graphOpt: Option<Graph> = await this.graphRepository.findGraphBy(
      {
        id: graphId,
      },
      true,
    )

    if (isNone(graphOpt)) {
      return error
    }

    // If no parentVertexId is provided, we just create a vertex
    // TODO: This will be changed when we create a page with root vertex
    const graph: Graph = graphOpt.value
    const vertex: Vertex = plainToClass(Vertex, newVertex)
    const savedVertex: Vertex = await this.vertexRepository.createVertex(
      vertex,
      graph,
    )

    graphOpt = await this.graphRepository.findGraphBy(
      {
        id: graphId,
      },
      true,
    )

    if (isNone(graphOpt)) {
      return error
    }

    if (parentVertexId) {
      // Create Vertex and connect via edge
      const vertexExists = await this.vertexRepository.exists({
        id: parentVertexId,
      })

      if (!vertexExists) {
        return left(new AddChildNodeErrors.VertexNotFoundError(parentVertexId))
      }

      const newEdgeDto: SerializedEdgeDto = {
        source: parentVertexId,
        target: savedVertex.toPlain().id as string,
        order: order || 0,
        props: newVertex.props,
      }

      const newEdge: Edge = Edge.hydrate(newEdgeDto)

      await this.edgeRepository.createEdge(newEdge, graph)
      graphOpt = await this.graphRepository.findGraphBy(
        {
          id: graphId,
        },
        true,
      )

      if (isNone(graphOpt)) {
        return error
      }
    }

    return right(Result.ok(graphOpt.value))
  }
}
