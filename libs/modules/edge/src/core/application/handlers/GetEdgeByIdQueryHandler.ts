import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { EdgeDITokens } from '../../../framework/EdgeDITokens'
import { Edge } from '../../domain/edge'
import { GedEdgeByIdQuery } from '../queries/GedEdgeByIdQuery'
import { GetEdgeService } from '../services/GetEdgeService'
import { Result } from '@codelab/backend'

@QueryHandler(GedEdgeByIdQuery)
export class GetEdgeByIdQueryHandler
  implements IQueryHandler<GedEdgeByIdQuery> {
  constructor(
    @Inject(EdgeDITokens.GetEdgeUseCase)
    private readonly service: GetEdgeService,
  ) {}

  async execute(query: GedEdgeByIdQuery): Promise<Edge> {
    const edge = await this.service.getEdgeById(query.request.id)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Edge>) => results.value,
    )(edge)
  }
}
