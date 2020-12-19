import { right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { Edge } from '../../domain/edge'
import { CreateEdgeRequest } from '../useCases/createEdge/CreateEdgeRequest'
import { CreateEdgeResponse } from '../useCases/createEdge/CreateEdgeResponse'
import { CreateEdgeUseCase } from '../useCases/createEdge/CreateEdgeUseCase'
import { Result } from '@codelab/backend'

export class CreateEdgeService implements CreateEdgeUseCase {
  constructor(private readonly edgeRepository: EdgeRepositoryPort) {}

  async execute(request: CreateEdgeRequest): Promise<CreateEdgeResponse> {
    const edge = Edge.create(request)

    const persistedEdge = await this.edgeRepository.createEdge(edge)

    return right(Result.ok(persistedEdge))
  }
}
