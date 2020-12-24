import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddChildNodeCommand } from '../../core/application/commands/AddChildNodeCommand'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { GraphUseCaseDto } from '../../core/application/useCases/GraphUseCaseDto'
import { AddChildNodeRequest } from '../../core/application/useCases/addChildNode/AddChildNodeRequest'
import { CreateGraphRequest } from '../../core/application/useCases/createGraph/CreateGraphRequest'
import { Graph } from '../../core/domain/graph/graph'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

@Resolver(() => GraphUseCaseDto)
@Injectable()
export class GraphCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Query(() => [GraphUseCaseDto])
  async graphs() {
    const results = await this.queryBus.execute(new GetGraphQuery())

    return Graph.arrayToPlain(results)
  }

  @Mutation(() => GraphUseCaseDto)
  async createGraph(@Args('graph') request: CreateGraphRequest) {
    const graph: Graph = await this.commandBus.execute(
      new CreateGraphCommand(request),
    )

    return graph.toPlain()
  }

  @Mutation(() => GraphUseCaseDto)
  async addChildNode(@Args('request') request: AddChildNodeRequest) {
    const graph: Graph = await this.commandBus.execute(
      new AddChildNodeCommand(request),
    )

    return graph.toPlain()
  }
}
