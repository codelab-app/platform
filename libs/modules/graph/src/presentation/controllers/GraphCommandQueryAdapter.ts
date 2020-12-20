import { Injectable, OnModuleInit } from '@nestjs/common'
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
import { GetEdgeService } from '../../../../edge/src/core/application/services/GetEdgeService'
import { EdgeUseCaseDto } from '../../../../edge/src/core/application/useCases/EdgeUseCaseDto'
import { EdgeDITokens } from '../../../../edge/src/framework/EdgeDITokens'
import { GetVertexService } from '../../../../vertex/src/core/application/services/GetVertexService'
import { VertexUseCaseDto } from '../../../../vertex/src/core/application/useCases/VertexUseCaseDto'
import { VertexDITokens } from '../../../../vertex/src/framework/VertexDITokens'
import { CreateGraphCommand } from '../../core/application/commands/CreateGraphCommand'
import { GetGraphQuery } from '../../core/application/queries/GetGraphQuery'
import { GraphUseCaseDto } from '../../core/application/useCases/GraphUseCaseDto'
import { CreateGraphRequest } from '../../core/application/useCases/createGraph/CreateGraphRequest'
import { Graph } from '../../core/domain/graph'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'
import { Edge } from '@codelab/modules/edge'
import { Vertex } from '@codelab/modules/vertex'

@Resolver(() => GraphUseCaseDto)
@Injectable()
export class GraphCommandQueryAdapter
  implements CommandQueryBusPort, OnModuleInit {
  declare vertexService: GetVertexService

  declare edgeService: GetEdgeService

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

  @ResolveField('vertices', (returns) => [VertexUseCaseDto])
  async getVertices(@Parent() graph: GraphUseCaseDto) {
    const vertices = await this.vertexService.getVerticesByGraphId(
      graph.id as string,
    )

    return Vertex.arrayToPlain(vertices)
  }

  @ResolveField('edges', (returns) => [EdgeUseCaseDto])
  async getEdges(@Parent() graph: GraphUseCaseDto) {
    const edges = await this.edgeService.getEdgesByGraphId(graph.id as string)

    return Edge.arrayToPlain(edges)
  }

  onModuleInit(): any {
    this.vertexService = this.moduleRef.get(VertexDITokens.GetVertexUseCase, {
      strict: false,
    })
    this.edgeService = this.moduleRef.get(EdgeDITokens.GetEdgeUseCase, {
      strict: false,
    })
  }
}
