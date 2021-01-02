import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddChildNodeCommand } from '../../core/application/commands/AddChildNodeCommand'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { DeleteNodeCommand } from '../../core/application/commands/DeleteNodeCommand'
import { MoveNodeCommand } from '../../core/application/commands/MoveNodeCommand'
import { UpdateNodeCommand } from '../../core/application/commands/UpdateNodeCommand'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { DeleteNodeRequest } from '../../core/application/useCases/DeleteNode/DeleteNodeRequest'
import { GetGraphRequest } from '../../core/application/useCases/GetGraph/GetGraphRequest'
import { GraphUseCaseDto } from '../../core/application/useCases/GraphUseCaseDto'
import { MoveNodeRequest } from '../../core/application/useCases/MoveNode/MoveNodeRequest'
import { UpdateNodeRequest } from '../../core/application/useCases/UpdateNode/UpdateNodeRequest'
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

  @Mutation((returns) => GraphUseCaseDto)
  async updateNode(@Args('request') request: UpdateNodeRequest) {
    const result = await this.commandBus.execute(new UpdateNodeCommand(request))

    return result.toPlain()
  }

  @Query((returns) => GraphUseCaseDto)
  async graph(@Args('request') request: GetGraphRequest) {
    const result = await this.queryBus.execute(new GetGraphQuery(request))

    return result.toPlain()
  }

  @Mutation((returns) => GraphUseCaseDto)
  async deleteNode(@Args('request') request: DeleteNodeRequest) {
    const result = await this.commandBus.execute(new DeleteNodeCommand(request))

    return result.toPlain()
  }

  @Mutation((returns) => GraphUseCaseDto)
  async moveNode(@Args('request') request: MoveNodeRequest) {
    const result = await this.commandBus.execute(new MoveNodeCommand(request))

    return result.toPlain()
  }
}
