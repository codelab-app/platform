import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddChildNodeCommand } from '../../core/application/commands/AddChildNodeCommand'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { DeleteNodeCommand } from '../../core/application/commands/DeleteNodeCommand'
import { MoveNodeCommand } from '../../core/application/commands/MoveNodeCommand'
import { UpdateNodeCommand } from '../../core/application/commands/UpdateNodeCommand'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { GraphDto } from '../../core/application/useCases/GraphDto'
import { AddChildNodeInput } from '../../core/application/useCases/addChildNode/AddChildNodeInput'
import { CreateGraphInput } from '../../core/application/useCases/createGraph/CreateGraphInput'
import { DeleteNodeInput } from '../../core/application/useCases/deleteNode/DeleteNodeInput'
import { GetGraphInput } from '../../core/application/useCases/getGraph/GetGraphInput'
import { MoveNodeInput } from '../../core/application/useCases/moveNode/MoveNodeInput'
import { UpdateNodeInput } from '../../core/application/useCases/updateNode/UpdateNodeInput'
import { Graph } from '../../core/domain/graph/graph'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

@Resolver(() => GraphDto)
@Injectable()
export class GraphCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Mutation(() => GraphDto)
  async createGraph(@Args('input') input: CreateGraphInput) {
    const graph: Graph = await this.commandBus.execute(
      new CreateGraphCommand(input),
    )

    return graph.toPlain()
  }

  @Mutation(() => GraphDto)
  async addChildNode(@Args('input') input: AddChildNodeInput) {
    const graph: Graph = await this.commandBus.execute(
      new AddChildNodeCommand(input),
    )

    return graph.toPlain()
  }

  @Mutation((returns) => GraphDto)
  async updateNode(@Args('input') input: UpdateNodeInput) {
    const result = await this.commandBus.execute(new UpdateNodeCommand(input))

    return result.toPlain()
  }

  @Query((returns) => GraphDto)
  async graph(@Args('input') input: GetGraphInput) {
    const result = await this.queryBus.execute(new GetGraphQuery(input))

    return result.toPlain()
  }

  @Mutation((returns) => GraphDto)
  async deleteNode(@Args('input') input: DeleteNodeInput) {
    const result = await this.commandBus.execute(new DeleteNodeCommand(input))

    return result.toPlain()
  }

  @Mutation((returns) => GraphDto)
  async moveNode(@Args('input') input: MoveNodeInput) {
    const result = await this.commandBus.execute(new MoveNodeCommand(input))

    return result.toPlain()
  }
}
