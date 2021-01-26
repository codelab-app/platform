import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  registerEnumType,
} from '@nestjs/graphql'
import { AddChildNodeCommand } from '../../core/application/commands/AddChildNodeCommand'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { DeleteNodeCommand } from '../../core/application/commands/DeleteNodeCommand'
import { MoveNodeCommand } from '../../core/application/commands/MoveNodeCommand'
import { UpdateNodeCommand } from '../../core/application/commands/UpdateNodeCommand'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { AddChildNodeInput } from '../../core/application/useCases/addChildNode/AddChildNodeInput'
import { CreateGraphInput } from '../../core/application/useCases/createGraph/CreateGraphInput'
import { DeleteNodeInput } from '../../core/application/useCases/deleteNode/DeleteNodeInput'
import { GetGraphInput } from '../../core/application/useCases/getGraph/GetGraphInput'
import { MoveNodeInput } from '../../core/application/useCases/moveNode/MoveNodeInput'
import { UpdateNodeInput } from '../../core/application/useCases/updateNode/UpdateNodeInput'
import { Graph } from '../../core/domain/graph/graph'
import { GraphEntity } from '../../core/domain/graph/graph.codec'
import { VertexType } from '../../core/domain/vertex/vertex-type.codec'
import { GraphDto } from '../GraphDto'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

registerEnumType(VertexType, {
  name: 'VertexType',
})
@Resolver('Graph')
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

    return GraphEntity.encode(graph)
  }

  @Mutation(() => GraphDto)
  async addChildNode(@Args('input') input: AddChildNodeInput) {
    const graph = await this.commandBus.execute(new AddChildNodeCommand(input))

    return graph
  }

  @Mutation(() => GraphDto)
  async updateNode(@Args('input') input: UpdateNodeInput) {
    const graph = await this.commandBus.execute(new UpdateNodeCommand(input))

    return graph
  }

  @Query(() => GraphDto)
  async graph(@Args('input') input: GetGraphInput) {
    const graph = await this.queryBus.execute(new GetGraphQuery(input))

    return graph
  }

  @Mutation(() => GraphDto)
  async deleteNode(@Args('input') input: DeleteNodeInput) {
    const result = await this.commandBus.execute(new DeleteNodeCommand(input))

    return Graph.hydrate(result)
  }

  @Mutation(() => GraphDto)
  async moveNode(@Args('input') input: MoveNodeInput) {
    const graph = await this.commandBus.execute(new MoveNodeCommand(input))

    return graph
  }
}
