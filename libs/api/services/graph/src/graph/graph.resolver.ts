import { Query, Resolver } from '@nestjs/graphql'
import { GraphService } from './graph.service'
import { GraphEntity } from '@codelab/api/services/graph'

@Resolver(() => GraphEntity)
export class GraphResolver {
  constructor(public graphService: GraphService) {}

  @Query(() => [GraphEntity])
  async getAll() {
    return this.graphService.findAll()
  }
}
