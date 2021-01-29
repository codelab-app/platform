import { Injectable } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AddChildVertexInput } from '../../core/application/useCases/addChildVertex/AddChildVertexInput'
import { AddChildVertexService } from '../../core/application/useCases/addChildVertex/AddChildVertexService'
import { CreateGraphInput } from '../../core/application/useCases/createGraph/CreateGraphInput'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { GetGraphByInput } from '../../core/application/useCases/getGraph/GetGraphByInput'
import { GetGraphInput } from '../../core/application/useCases/getGraph/GetGraphInput'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveVertexInput } from '../../core/application/useCases/moveVertex/MoveVertexInput'
import { MoveVertexService } from '../../core/application/useCases/moveVertex/MoveVertexService'
import { Edge } from '../../core/domain/edge/Edge'
import { Graph } from '../../core/domain/graph/Graph'
import { Vertex } from '../../core/domain/vertex/Vertex'
import { PrismaService } from '@codelab/backend'

@Resolver(() => Graph)
@Injectable()
export class GraphResolvers {
  constructor(
    private readonly createGraphService: CreateGraphService,
    private readonly addChildVertexService: AddChildVertexService,
    private readonly modeVertexService: MoveVertexService,
    private readonly getGraphService: GetGraphService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Graph)
  createGraph(@Args('input') input: CreateGraphInput) {
    return this.createGraphService.execute(input)
  }

  @Mutation(() => Vertex)
  addChildVertex(@Args('input') input: AddChildVertexInput) {
    return this.addChildVertexService.execute(input)
  }

  @Query(() => Graph)
  getGraph(@Args('input') input: GetGraphInput) {
    return this.getGraphService.execute(input)
  }

  @Query(() => Graph)
  getGraphBy(@Args('input') input: GetGraphByInput) {
    return this.getGraphService.getGraphBy(input)
  }

  @Mutation(() => Graph)
  modeVertex(@Args('input') input: MoveVertexInput) {
    return this.modeVertexService.execute(input)
  }

  @ResolveField('vertices', (returns) => [Vertex])
  getVertices(@Parent() graph: Graph) {
    return this.prismaService.vertex.findMany({
      where: {
        graphId: graph.id,
      },
    })
  }

  @ResolveField('edges', (returns) => [Edge])
  edges(@Parent() graph: Graph) {
    return this.prismaService.edge.findMany({
      where: {
        graphId: graph.id,
      },
    })
  }
}
