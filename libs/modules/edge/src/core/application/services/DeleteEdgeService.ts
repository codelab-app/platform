import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { Edge } from '../../domain/edge'
import { DeleteEdgeErrors } from '../useCases/deleteEdge/DeleteEdgeErrors'
import { DeleteEdgeRequest } from '../useCases/deleteEdge/DeleteEdgeRequest'
import { DeleteEdgeResponse } from '../useCases/deleteEdge/DeleteEdgeResponse'
import { DeleteEdgeUseCase } from '../useCases/deleteEdge/DeleteEdgeUseCase'
import { Result } from '@codelab/backend'

export class DeleteEdgeService implements DeleteEdgeUseCase {
  constructor(private readonly edgeRepository: EdgeRepositoryPort) {}

  async execute(request: DeleteEdgeRequest): Promise<DeleteEdgeResponse> {
    const existingEdge: Option<Edge> = await this.edgeRepository.findEdge({
      id: request.id,
    })

    const leftResult = left(new DeleteEdgeErrors.EdgeNotFoundError(request.id))

    if (O.isSome(existingEdge)) {
      const result = await this.edgeRepository.deleteEdge(existingEdge.value)

      if (O.isSome(result)) {
        return right(Result.ok(result.value))
      }
    }

    return leftResult
  }
}
