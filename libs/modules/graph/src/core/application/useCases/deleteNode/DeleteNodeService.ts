import { left, right } from 'fp-ts/Either'
import { Option, isNone } from 'fp-ts/Option'
import { EdgeRepositoryPort } from '../../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../../adapters/VertexRepositoryPort'
import { Vertex } from '../../../domain/vertex'
import { DeleteNodeErrors } from './DeleteNodeErrors'
import { DeleteNodeRequest } from './DeleteNodeRequest'
import { DeleteNodeResponse } from './DeleteNodeResponse'
import { DeleteNodeUseCase } from './DeleteNodeUseCase'
import { Result } from '@codelab/backend'

export class DeleteNodeService implements DeleteNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async execute({ vertexId }: DeleteNodeRequest): Promise<DeleteNodeResponse> {
    const vertexToDelete = await this.vertexRepository.findOne({ vertexId })

    if (isNone(vertexToDelete)) {
      return left(new DeleteNodeErrors.VertexNotFound(vertexId))
    }

    const deletedVertex: Option<Vertex> = await this.vertexRepository.delete(
      vertexId,
    )

    if (isNone(deletedVertex)) {
      return left(new DeleteNodeErrors.VertexNotFound(vertexId))
    }

    await this.edgeRepository.deleteEdgesByVertexId(vertexId)

    const { graphId } = vertexToDelete.value

    const graph = await this.graphRepository.findSingle({
      graphId: graphId.toString(),
    })

    if (isNone(graph)) {
      return left(new DeleteNodeErrors.GraphNotFoundError(graphId.toString()))
    }

    return right(Result.ok(graph.value))
  }
}
