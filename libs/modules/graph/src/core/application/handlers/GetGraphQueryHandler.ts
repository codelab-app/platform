import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph'
import { GetGraphQuery } from '../queries/GetGraphQuery'
import { GetGraphUseCase } from '../useCases/getGraph/GetGraphUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(GetGraphQuery)
export class GetGraphQueryHandler implements IQueryHandler<GetGraphQuery> {
  constructor(
    @Inject(GraphDITokens.GetGraphUseCase)
    private readonly service: GetGraphUseCase,
  ) {}

  public async execute({ request }: GetGraphQuery): Promise<Graph> {
    const { graphId } = request
    const GetGraphResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(GetGraphResults)
  }
}
