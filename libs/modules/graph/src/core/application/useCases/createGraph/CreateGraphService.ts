import { right } from 'fp-ts/lib/Either'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { Graph } from '../../../domain/graph/graph'
import { CreateGraphRequest } from './CreateGraphRequest'
import { CreateGraphResponse } from './CreateGraphResponse'
import { CreateGraphUseCase } from './CreateGraphUseCase'
import { NOID, Result } from '@codelab/backend'

export class CreateGraphService implements CreateGraphUseCase {
  constructor(private readonly graphRepository: GraphRepositoryPort) {}

  async execute(request: CreateGraphRequest): Promise<CreateGraphResponse> {
    const graph = new Graph<NOID>(request)

    const newGraph = await this.graphRepository.createGraph(graph)

    return right(Result.ok(newGraph))
  }
}
