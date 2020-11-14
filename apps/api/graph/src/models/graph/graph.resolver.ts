import { Query, Resolver } from '@nestjs/graphql'
import { GraphEntity } from './graph.entity'
import { GraphService } from './graph.service'

@Resolver(() => GraphEntity)
export class GraphResolver {
  constructor(public graphService: GraphService) {}

  @Query(() => [GraphEntity])
  async getAllGraphs() {
    return this.graphService.findAll()
  }
}
