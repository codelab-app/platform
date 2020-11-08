import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { GraphObject } from './graph.object'
import { GraphService } from './graph.service'
import { GraphEntity } from '@codelab/api/services/graph'

@Resolver(() => GraphEntity)
export class GraphResolver {
  constructor(public graphService: GraphService) {}

  @Query(() => [GraphEntity])
  async getAll() {
    return this.graphService.findAll()
  }

  @Query(() => GraphObject)
  async getGraphsForUser(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ): Promise<GraphObject> {
    return this.graphService.getGraphsForUser(userId)
  }
}
