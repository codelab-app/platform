import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateVertexCommand } from '../../core/application/commands/CreateVertexCommand'
import { DeleteVertexCommand } from '../../core/application/commands/DeleteVertexCommand'
import { UpdateVertexCommand } from '../../core/application/commands/UpdateVertexCommand'
import { GetVertexByIdQuery } from '../../core/application/queries/GetVertexByIdQuery'
import { GetVertexQuery } from '../../core/application/queries/GetVertexQuery'
import { VertexUseCaseDto } from '../../core/application/useCases/VertexUseCaseDto'
import { CreateVertexRequest } from '../../core/application/useCases/createVertex/CreateVertexRequest'
import { DeleteVertexRequest } from '../../core/application/useCases/deleteVertex/DeleteVertexRequest'
import { GetVertexByIdRequest } from '../../core/application/useCases/getVertex/GetVertexByIdRequest'
import { UpdateVertexRequest } from '../../core/application/useCases/updateVertex/UpdateVertexRequest'
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

  @Mutation(() => VertexUseCaseDto)
  async updateVertex(@Args('vertex') request: UpdateVertexRequest) {
    const vertex: Vertex = await this.commandBus.execute(
      new UpdateVertexCommand(request),
    )

    return vertex.toPlain()
  }

  @Mutation(() => VertexUseCaseDto)
  async deleteVertexById(@Args('vertex') request: DeleteVertexRequest) {
    const vertex: Vertex = await this.commandBus.execute(
      new DeleteVertexCommand(request),
    )

    return vertex.toPlain()
  }
}
