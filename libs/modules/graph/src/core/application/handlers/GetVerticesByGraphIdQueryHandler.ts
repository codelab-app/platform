import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { GetVerticesByGraphIdQuery } from '../queries/GetVerticesByGraphIdQuery'
import { GetGraphService } from '../services/GetGraphService'
import { Vertex } from '@codelab/modules/vertex'

@QueryHandler(GetVerticesByGraphIdQuery)
export class GetVerticesByGraphIdQueryHandler
  implements IQueryHandler<GetVerticesByGraphIdQuery> {
  constructor(
    @Inject(GraphDITokens.GetGraphUseCase)
    private readonly service: GetGraphService,
  ) {}

  execute(query: GetVerticesByGraphIdQuery): Promise<Array<Vertex>> {
    return this.service.getVerticesByGraphId(query.request.id as string)
  }
}
