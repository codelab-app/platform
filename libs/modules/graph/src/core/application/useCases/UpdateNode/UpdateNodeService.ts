import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../../adapters/VertexRepositoryPort'
import { Graph } from '../../../domain/graph'
import { Vertex } from '../../../domain/vertex'
import { UpdateNodeErrors } from './UpdateNodeErrors'
import { UpdateNodeRequest } from './UpdateNodeRequest'
import { UpdateNodeResponse } from './UpdateNodeResponse'
import { UpdateNodeUseCase } from './UpdateNodeUseCase'
import { Result } from '@codelab/backend'

export class UpdateNodeService implements UpdateNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
  ) {}

  async execute(request: UpdateNodeRequest): Promise<UpdateNodeResponse> {
    const { graphId, type } = request

    const vertex = Vertex.create(type)

    const updatedVertex: Option<Vertex> = await this.vertexRepository.updateVertex(
      vertex,
    )

    if (isNone(updatedVertex)) {
      return left(new UpdateNodeErrors.VertexNotFound(type.id))
    }

    const graphOpt: Option<Graph> = await this.graphRepository.findGraphBy(
      {
        id: graphId,
      },
      true,
    )

    if (isNone(graphOpt)) {
      return left(new UpdateNodeErrors.GraphNotFoundError(graphId))
    }

    return right(Result.ok(graphOpt.value))
  }
}
