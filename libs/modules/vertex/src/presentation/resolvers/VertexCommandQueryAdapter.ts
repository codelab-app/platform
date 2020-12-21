import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import { GetVertexQuery } from '../../core/application/queries/GetVertexQuery'
import { VertexUseCaseDto } from '../../core/application/useCases/VertexUseCaseDto'
import { Vertex } from '../../core/domain/vertex'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

@Resolver(() => Vertex)
export class VertexCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Query((returns) => [VertexUseCaseDto])
  async vertices() {
    const vertices = await this.queryBus.execute(new GetVertexQuery({}))

    return Vertex.arrayToPlain(vertices)
  }
}
