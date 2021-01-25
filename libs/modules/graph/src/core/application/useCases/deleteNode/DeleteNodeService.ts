import { left, right } from 'fp-ts/Either'
import { Option, isNone } from 'fp-ts/Option'
import { EdgeRepositoryPort } from '../../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { VertexRepositoryPort } from '../../../adapters/VertexRepositoryPort'
import { Vertex } from '../../../domain/vertex/vertex'
import { DeleteNodeErrors } from './DeleteNodeErrors'
import { DeleteNodeRequest } from './DeleteNodeRequest'
import { DeleteNodeResponse } from './DeleteNodeResponse'
import { DeleteNodeUseCase } from './DeleteNodeUseCase'
import { Result } from '@codelab/backend'

/**
 * Delete all attached edges as well
 */
export class DeleteNodeService implements DeleteNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly vertexRepository: VertexRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async execute({ vertexId }: DeleteNodeRequest): Promise<DeleteNodeResponse> {
    const vertexToDelete = await this.vertexRepository.findOne({ id: vertexId })

    if (isNone(vertexToDelete)) {
      return left(new DeleteNodeErrors.VertexNotFound(vertexId))
    }

    const deletedVertex: Option<Vertex> = await this.vertexRepository.delete({
      id: vertexId,
    })

    if (isNone(deletedVertex)) {
      return left(new DeleteNodeErrors.VertexNotFound(vertexId))
    }

    const edges = await this.edgeRepository.deleteMany({
      vertex: { id: vertexId },
    })

    const { graphId } = deletedVertex.value

    const graph = await this.graphRepository.findOne({
      id: graphId,
    })

    if (isNone(graph)) {
      return left(new DeleteNodeErrors.GraphNotFoundError(graphId.toString()))
    }

    return right(Result.ok(graph.value))
  }
}
