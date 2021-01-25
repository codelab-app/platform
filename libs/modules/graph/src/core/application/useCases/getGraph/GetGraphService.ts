import { option as O } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option, isNone } from 'fp-ts/Option'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { Graph } from '../../../domain/graph/graph'
import { GetGraphErrors } from './GetGraphErrors'
import { GetGraphRequest } from './GetGraphRequest'
import { GetGraphResponse } from './GetGraphResponse'
import { GetGraphUseCase } from './GetGraphUseCase'
import { Result } from '@codelab/backend'

export class GetGraphService implements GetGraphUseCase {
  constructor(private readonly graphRepository: GraphRepositoryPort) {}

  async execute(request: GetGraphRequest): Promise<GetGraphResponse> {
    const { graphId, pageId } = request
    let graphOpt: Option<Graph> = O.none

    if (graphId) {
      graphOpt = await this.graphRepository.findOne({
        id: graphId,
      })

      if (isNone(graphOpt)) {
        return left(
          new GetGraphErrors.GraphNotFoundError(
            `The graph with id ${graphId} was not found`,
          ),
        )
      }

      return right(Result.ok(graphOpt.value))
    }

    // if (pageId) {
    //   graphOpt = await this.graphRepository.findOne({
    //     pageId,
    //   })

    //   if (isNone(graphOpt)) {
    //     return left(new GetGraphErrors.GraphNotFoundError(pageId))
    //   }

    //   return right(Result.ok(graphOpt.value))
    // }

    return left(new GetGraphErrors.GraphNotFoundError(''))
  }
}
