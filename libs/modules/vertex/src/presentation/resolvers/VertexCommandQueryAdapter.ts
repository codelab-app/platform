import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import { GetUsersQuery } from '../../../../users/src/core/application/queries/GetUsersQuery'
import { CommandQueryBusPort } from '../../core/application/ports/primary/CommandQueryBusPort'
import { UseCaseRequestPort } from '../../core/application/ports/primary/UseCaseRequestPort'
import { GetVertexQuery } from '../../core/application/queries/GetVertexQuery'
import { VertexUseCaseDto } from '../../core/application/useCases/VertexUseCaseDto'
import { Vertex } from '../../core/domain/vertex'

@Resolver(() => Vertex)
export class VertexCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<GetUsersQuery>,
  ) {}

  @Query((returns) => [VertexUseCaseDto])
  async vertices() {
    const vertices = await this.queryBus.execute(new GetVertexQuery())

    return Vertex.arrayToPlain(vertices)
  }
}
