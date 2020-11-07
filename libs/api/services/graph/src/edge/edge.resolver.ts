import { Query, Resolver } from '@nestjs/graphql'
import { EdgeEntity } from './edge.entity'
import { EdgeService } from './edge.service'

@Resolver(() => EdgeEntity)
export class EdgeResolver {
  constructor(public edgeService: EdgeService) {}

  @Query(() => [EdgeEntity])
  async getAll() {
    return this.edgeService.findAll()
  }
}
