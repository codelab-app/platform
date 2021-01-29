import { Injectable } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { VertexService } from '../../core/application/services/VertexService'
import { DeleteNodeInput } from '../../core/application/useCases/deleteNode/DeleteNodeInput'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetVertexInput } from '../../core/application/useCases/getVertex/GetVertexInput'
import { GetVertexService } from '../../core/application/useCases/getVertex/GetVertexService'
import { UpdateNodeInput } from '../../core/application/useCases/updateNode/UpdateNodeInput'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { Vertex } from '../../core/domain/vertex/Vertex'
import { PrismaService } from '@codelab/backend'

@Resolver(() => Vertex)
@Injectable()
export class VertexResolvers {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly vertexService: VertexService,
    private readonly deleteNodeService: DeleteNodeService,
    private readonly getVertexService: GetVertexService,
    private readonly updateNodeService: UpdateNodeService,
  ) {}

  @ResolveField('parent', (returns) => Vertex, { nullable: true })
  parent(@Parent() vertex: Vertex) {
    return null
    // return this.vertexService.parent(vertex.id)
  }

  @Mutation(() => Vertex)
  updateNode(@Args('input') input: UpdateNodeInput) {
    return this.updateNodeService.execute(input)
  }

  @Mutation(() => Vertex)
  deleteNode(@Args('input') input: DeleteNodeInput) {
    return this.deleteNodeService.execute(input)
  }

  @ResolveField('children', (returns) => [Vertex])
  children(@Parent() vertex: Vertex) {
    return this.vertexService.children(vertex.id)
  }

  @Query(() => Vertex, { nullable: true })
  getVertex(@Args('input') input: GetVertexInput) {
    return this.getVertexService.execute(input)
  }
}
