import { Query, Resolver } from '@nestjs/graphql'
import { VertexEntity } from './vertex.entity'
import { VertexService } from './vertex.service'

@Resolver(() => VertexEntity)
export class VertexResolver {
  constructor(public vertexService: VertexService) {}

  @Query(() => [VertexEntity])
  async getAll() {
    return this.vertexService.findAll()
  }
}
