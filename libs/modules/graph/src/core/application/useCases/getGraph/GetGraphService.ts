import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { Graph } from '../../../domain/graph'
import { GetGraphErrors } from './GetGraphErrors'
import { GetGraphRequest } from './GetGraphRequest'
import { GetGraphResponse } from './GetGraphResponse'
import { GetGraphUseCase } from './GetGraphUseCase'
import { Result } from '@codelab/backend'

export class GetGraphService implements GetGraphUseCase {
  constructor(private readonly graphRepository: GraphRepositoryPort) {}

  async execute(request: GetGraphRequest): Promise<GetGraphResponse> {
    const { graphId } = request

    const graphOpt: Option<Graph> = await this.graphRepository.findGraphBy({
      id: graphId,
    })

    if (isNone(graphOpt)) {
      return left(new GetGraphErrors.GraphNotFoundError(graphId))
    }

    return right(Result.ok(graphOpt.value))
  }
}
