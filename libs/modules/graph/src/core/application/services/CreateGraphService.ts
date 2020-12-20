import { right } from 'fp-ts/lib/Either'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Graph } from '../../domain/graph'
import { CreateGraphRequest } from '../useCases/createGraph/CreateGraphRequest'
import { CreateGraphResponse } from '../useCases/createGraph/CreateGraphResponse'
import { CreateGraphUseCase } from '../useCases/createGraph/CreateGraphUseCase'
import { Result } from '@codelab/backend'

export class CreateGraphService implements CreateGraphUseCase {
  constructor(private readonly graphRepository: GraphRepositoryPort) {}

  async execute(request: CreateGraphRequest): Promise<CreateGraphResponse> {
    const graph = Graph.create(request)

    const persistedGraph = await this.graphRepository.createGraph(graph)

    return right(Result.ok(persistedGraph))
  }
}
