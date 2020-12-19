import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Vertex } from '../../domain/vertex'
import { UpdateVertexErrors } from '../useCases/updateVertex/UpdateVertexErrors'
import { UpdateVertexRequest } from '../useCases/updateVertex/UpdateVertexRequest'
import { UpdateVertexResponse } from '../useCases/updateVertex/UpdateVertexResponse'
import { UpdateVertexUseCase } from '../useCases/updateVertex/UpdateVertexUseCase'
import { Result } from '@codelab/backend'

export class UpdateVertexService implements UpdateVertexUseCase {
  constructor(private readonly vertexRepository: VertexRepositoryPort) {}

  async execute(request: UpdateVertexRequest): Promise<UpdateVertexResponse> {
    const v = Vertex.hydrate(request)

    const existingVertex: Option<Vertex> = await this.vertexRepository.findVertex(
      {
        id: request.id,
      },
    )

    if (O.isNone(existingVertex)) {
      return left(new UpdateVertexErrors.VertexNotFoundError(request.id))
    }

    const result = await this.vertexRepository.updateVertex(
      existingVertex.value,
      v,
    )

    return right(Result.ok(result))
  }
}
