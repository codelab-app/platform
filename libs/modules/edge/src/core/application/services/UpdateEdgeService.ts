import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { Edge } from '../../domain/edge'
import { UpdateEdgeErrors } from '../useCases/updateEdge/UpdateEdgeErrors'
import { UpdateEdgeRequest } from '../useCases/updateEdge/UpdateEdgeRequest'
import { UpdateEdgeResponse } from '../useCases/updateEdge/UpdateEdgeResponse'
import { UpdateEdgeUseCase } from '../useCases/updateEdge/UpdateEdgeUseCase'
import { Result } from '@codelab/backend'

export class UpdateEdgeService implements UpdateEdgeUseCase {
  constructor(private readonly edgeRepository: EdgeRepositoryPort) {}

  async execute(request: UpdateEdgeRequest): Promise<UpdateEdgeResponse> {
    const e = Edge.hydrate(request)

    const existingEdge: Option<Edge> = await this.edgeRepository.findEdge({
      id: request.id,
    })

    if (O.isNone(existingEdge)) {
      return left(new UpdateEdgeErrors.EdgeNotFoundError(request.id))
    }

    const result = await this.edgeRepository.updateEdge(existingEdge.value, e)

    return right(Result.ok(result))
  }
}
