import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { VertexDITokens } from '../../../framework/VertexDITokens'
import { Vertex } from '../../domain/vertex'
import { GetVertexQuery } from '../queries/GetVertexQuery'
import { GetVertexService } from '../services/GetVertexService'

@QueryHandler(GetVertexQuery)
export class GetVertexQueryHandler implements IQueryHandler<GetVertexQuery> {
  constructor(
    @Inject(VertexDITokens.GetVertexUseCase)
    private readonly service: GetVertexService,
  ) {}

  execute(query: GetVertexQuery): Promise<Array<Vertex>> {
    return this.service.execute()
  }
}
