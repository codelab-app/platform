import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph'
import { GetGraphQuery } from '../queries/GetGraphQuery'
import { GetGraphService } from '../services/GetGraphService'

@QueryHandler(GetGraphQuery)
export class GetGraphQueryHandler implements IQueryHandler<GetGraphQuery> {
  constructor(
    @Inject(GraphDITokens.GetGraphUseCase)
    private readonly service: GetGraphService,
  ) {}

  execute(query: GetGraphQuery): Promise<Array<Graph>> {
    return this.service.findAll()
  }
}
