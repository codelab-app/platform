import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Vertex } from '../../domain/vertex'
import { DeleteVertexErrors } from '../useCases/deleteVertex/DeleteVertexErrors'
import { DeleteVertexRequest } from '../useCases/deleteVertex/DeleteVertexRequest'
import { DeleteVertexResponse } from '../useCases/deleteVertex/DeleteVertexResponse'
import { DeleteVertexUseCase } from '../useCases/deleteVertex/DeleteVertexUseCase'
import { Result } from '@codelab/backend'

export class DeleteVertexService implements DeleteVertexUseCase {
  constructor(private readonly vertexRepository: VertexRepositoryPort) {}

  async execute(request: DeleteVertexRequest): Promise<DeleteVertexResponse> {
    const existingVertex: Option<Vertex> = await this.vertexRepository.findVertex(
      {
        id: request.id,
      },
    )

    const leftResult = left(
      new DeleteVertexErrors.VertexNotFoundError(request.id),
    )

    if (O.isSome(existingVertex)) {
      const result = await this.vertexRepository.deleteVertex(
        existingVertex.value,
      )

      if (O.isSome(result)) {
        return right(Result.ok(result.value))
      }
    }

    return leftResult
  }
}
