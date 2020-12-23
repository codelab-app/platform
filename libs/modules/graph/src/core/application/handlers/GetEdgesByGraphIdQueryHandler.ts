import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Edge } from '../../domain/edge/edge'
import { GetEdgesByGraphIdQuery } from '../queries/GetEdgesByGraphIdQuery'
import { GetVerticesByGraphIdQuery } from '../queries/GetVerticesByGraphIdQuery'
import { GetGraphService } from '../services/GetGraphService'

@QueryHandler(GetEdgesByGraphIdQuery)
export class GetEdgesByGraphIdQueryHandler
  implements IQueryHandler<GetEdgesByGraphIdQuery> {
  constructor(
    @Inject(GraphDITokens.GetGraphUseCase)
    private readonly service: GetGraphService,
  ) {}

  execute(query: GetVerticesByGraphIdQuery): Promise<Array<Edge>> {
    return this.service.getEdgesByGraphId(query.request.id as string)
  }
}
