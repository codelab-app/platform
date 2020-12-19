import { right } from 'fp-ts/lib/Either'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Vertex } from '../../domain/vertex'
import { CreateVertexRequest } from '../useCases/createVertex/CreateVertexRequest'
import { CreateVertexResponse } from '../useCases/createVertex/CreateVertexResponse'
import { CreateVertexUseCase } from '../useCases/createVertex/CreateVertexUseCase'
import { Result } from '@codelab/backend'

export class CreateVertexService implements CreateVertexUseCase {
  constructor(private readonly vertexRepository: VertexRepositoryPort) {}

  async execute(request: CreateVertexRequest): Promise<CreateVertexResponse> {
    const vertex = Vertex.create(request)

    const persistedVertex = await this.vertexRepository.createVertex(vertex)

    return right(Result.ok(persistedVertex))
  }
}
