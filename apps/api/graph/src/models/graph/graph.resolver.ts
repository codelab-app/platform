import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/gql.authguard'
import { GraphEntity } from './graph.entity'
import { GraphService } from './graph.service'

@Resolver(() => GraphEntity)
export class GraphResolver {
  constructor(public graphService: GraphService) {}

  @Query(() => [GraphEntity])
  async getAllGraphs() {
    return this.graphService.findAll()
  }

  @Mutation(() => GraphEntity)
  @UseGuards(GqlAuthGuard)
  async moveVertex(
    @Args({ name: 'src', type: () => String }) src: string,
    @Args({ name: 'target', type: () => String }) target: string,
  ) {
    return this.graphService.moveVertex(src, target)
  }
}
