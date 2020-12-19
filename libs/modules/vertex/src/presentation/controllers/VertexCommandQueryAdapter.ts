import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateVertexCommand } from '../../core/application/commands/CreateVertexCommand'
import { CommandQueryBusPort } from '../../core/application/ports/primary/CommandQueryBusPort'
import { GetVertexByIdQuery } from '../../core/application/queries/GetVertexByIdQuery'
import { GetVertexQuery } from '../../core/application/queries/GetVertexQuery'
import { VertexUseCaseDto } from '../../core/application/useCases/VertexUseCaseDto'
import { CreateVertexRequest } from '../../core/application/useCases/createVertex/CreateVertexRequest'
import { GetVertexByIdRequest } from '../../core/application/useCases/getVertex/GetVertexByIdRequest'
import { Vertex } from '../../core/domain/vertex'
import { UseCaseRequestPort } from '@codelab/backend'

@Resolver(() => Vertex)
export class VertexCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Query((returns) => [VertexUseCaseDto])
  async vertices() {
    const vertices = await this.queryBus.execute(new GetVertexQuery())
    const plain = Vertex.arrayToPlain(vertices)

    return Vertex.arrayToPlain(vertices)
  }

  @Query((returns) => VertexUseCaseDto)
  async getVertexById(@Args('vertex') request: GetVertexByIdRequest) {
    const vertex = await this.queryBus.execute(new GetVertexByIdQuery(request))

    return vertex.toPlain()
  }

  @Mutation(() => VertexUseCaseDto)
  async createVertex(@Args('vertex') request: CreateVertexRequest) {
    const vertex: Vertex = await this.commandBus.execute(
      new CreateVertexCommand(request),
    )

    return vertex.toPlain()
  }
}
