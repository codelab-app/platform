import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Graph } from '../../domain/graph'
import { Vertex } from '../../domain/vertex'
import { DeleteNodeErrors } from '../useCases/DeleteNode/DeleteNodeErrors'
import { DeleteNodeRequest } from '../useCases/DeleteNode/DeleteNodeRequest'
import { DeleteNodeResponse } from '../useCases/DeleteNode/DeleteNodeResponse'
import { DeleteNodeUseCase } from '../useCases/DeleteNode/DeleteNodeUseCase'
import { Result } from '@codelab/backend'

export class DeleteNodeService implements DeleteNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async execute(request: DeleteNodeRequest): Promise<DeleteNodeResponse> {
    const { vertexId } = request

    const deleteVertexResultOpt: Option<Vertex> = await this.vertexRepository.deleteVertex(
      vertexId,
    )

    if (isNone(deleteVertexResultOpt)) {
      return left(new DeleteNodeErrors.VertexNotFound(vertexId))
    }

    await this.edgeRepository.deleteEdgesByVertexId(vertexId)
    const graphId = deleteVertexResultOpt.value.graphId?.value
    const graphOpt: Option<Graph> = await this.graphRepository.findGraphBy(
      {
        id: graphId as string,
      },
      true,
    )

    if (isNone(graphOpt)) {
      return left(new DeleteNodeErrors.GraphNotFoundError(graphId as string))
    }

    return right(Result.ok(graphOpt.value))
  }
}
