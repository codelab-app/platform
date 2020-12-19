import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateEdgeCommand } from '../../core/application/commands/CreateEdgeCommand'
import { DeleteEdgeCommand } from '../../core/application/commands/DeleteEdgeCommand'
import { UpdateEdgeCommand } from '../../core/application/commands/UpdateEdgeCommand'
import { GedEdgeByIdQuery } from '../../core/application/queries/GedEdgeByIdQuery'
import { GetEdgeQuery } from '../../core/application/queries/GetEdgeQuery'
import { EdgeUseCaseDto } from '../../core/application/useCases/EdgeUseCaseDto'
import { CreateEdgeRequest } from '../../core/application/useCases/createEdge/CreateEdgeRequest'
import { DeleteEdgeRequest } from '../../core/application/useCases/deleteEdge/DeleteEdgeRequest'
import { GetEdgeByIdRequest } from '../../core/application/useCases/getEdge/GetEdgeByIdRequest'
import { UpdateEdgeRequest } from '../../core/application/useCases/updateEdge/UpdateEdgeRequest'
import { Edge } from '../../core/domain/edge'
import {
  CommandQueryBusPort,
  TypeOrmEdge,
  UseCaseRequestPort,
} from '@codelab/backend'

@Resolver(() => TypeOrmEdge)
@Injectable()
export class EdgeCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Query(() => [EdgeUseCaseDto])
  async edges() {
    const results = await this.queryBus.execute(new GetEdgeQuery())

    return Edge.arrayToPlain(results)
  }

  @Query((returns) => EdgeUseCaseDto)
  async getEdgeById(@Args('edge') request: GetEdgeByIdRequest) {
    const edge = await this.queryBus.execute(new GedEdgeByIdQuery(request))

    return edge.toPlain()
  }

  @Mutation(() => EdgeUseCaseDto)
  async createEdge(@Args('edge') request: CreateEdgeRequest) {
    const edge: Edge = await this.commandBus.execute(
      new CreateEdgeCommand(request),
    )

    return edge.toPlain()
  }

  @Mutation(() => EdgeUseCaseDto)
  async updateEdge(@Args('edge') request: UpdateEdgeRequest) {
    const edge: Edge = await this.commandBus.execute(
      new UpdateEdgeCommand(request),
    )

    return edge.toPlain()
  }

  @Mutation(() => EdgeUseCaseDto)
  async deleteEdgeById(@Args('edge') request: DeleteEdgeRequest) {
    const edge: Edge = await this.commandBus.execute(
      new DeleteEdgeCommand(request),
    )

    return edge.toPlain()
  }
}
