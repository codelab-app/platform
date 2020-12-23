import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { EdgeUseCaseDto } from '../../../../edge/src/core/application/useCases/EdgeUseCaseDto'
import { VertexUseCaseDto } from '../../../../vertex/src/core/application/useCases/VertexUseCaseDto'
import { AddChildNodeCommand } from '../../core/application/commands/AddChildNodeCommand'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { GetEdgesByGraphIdQuery } from '../../core/application/queries/GetEdgesByGraphIdQuery'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { GetVerticesByGraphIdQuery } from '../../core/application/queries/GetVerticesByGraphIdQuery'
import { GraphUseCaseDto } from '../../core/application/useCases/GraphUseCaseDto'
import { AddChildNodeRequest } from '../../core/application/useCases/addChildNode/AddChildNodeRequest'
import { CreateGraphRequest } from '../../core/application/useCases/createGraph/CreateGraphRequest'
import { Graph } from '../../core/domain/graph/graph'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'
import { Edge } from '@codelab/modules/edge'
import { Vertex } from '@codelab/modules/vertex'

@Resolver(() => GraphUseCaseDto)
@Injectable()
export class GraphCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
    readonly moduleRef: ModuleRef,
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

  @ResolveField('vertices', (returns) => [VertexUseCaseDto])
  async getVertices(@Parent() graph: GraphUseCaseDto) {
    const vertices = await this.queryBus.execute(
      new GetVerticesByGraphIdQuery(graph),
    )

    return Vertex.arrayToPlain(vertices)
  }

  @ResolveField('edges', (returns) => [EdgeUseCaseDto])
  async getEdges(@Parent() graph: GraphUseCaseDto) {
    const edges = await this.queryBus.execute(new GetEdgesByGraphIdQuery(graph))

    return Edge.arrayToPlain(edges)
  }
}
