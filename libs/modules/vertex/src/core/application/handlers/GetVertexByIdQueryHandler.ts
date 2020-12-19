import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { VertexDITokens } from '../../../framework/VertexDITokens'
import { Vertex } from '../../domain/vertex'
import { GetVertexByIdQuery } from '../queries/GetVertexByIdQuery'
import { GetVertexService } from '../services/GetVertexService'
import { Result } from '@codelab/backend'

@QueryHandler(GetVertexByIdQuery)
export class GetVertexByIdQueryHandler
  implements IQueryHandler<GetVertexByIdQuery> {
  constructor(
    @Inject(VertexDITokens.GetVertexUseCase)
    private readonly service: GetVertexService,
  ) {}

  async execute(query: GetVertexByIdQuery): Promise<Vertex> {
    const vertex = await this.service.getVertexById(query.request.id)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Vertex>) => results.value,
    )(vertex)
  }
}
