import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { EdgeDITokens } from '../../../framework/EdgeDITokens'
import { Edge } from '../../domain/edge'
import { GetEdgeQuery } from '../queries/GetEdgeQuery'
import { GetEdgeService } from '../services/GetEdgeService'

@QueryHandler(GetEdgeQuery)
export class GetEdgeQueryHandler implements IQueryHandler<GetEdgeQuery> {
  constructor(
    @Inject(EdgeDITokens.GetEdgeUseCase)
    private readonly service: GetEdgeService,
  ) {}

  execute(query: GetEdgeQuery): Promise<Array<Edge>> {
    return this.service.getAllEdges()
  }
}
