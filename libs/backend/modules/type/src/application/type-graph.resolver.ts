import { Injectable } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { TypeGraph } from '../domain/type-graph'

@Resolver(() => TypeGraph)
@Injectable()
export class TypeGraphResolver {
  /**
   * Vertices contain only id's of the type, for exporting data, we'll want to resolve the entire tree
   * @param typeGraph
   */
  // @ResolveField('vertices', () => [TypeVertex])
  // vertices(@Parent() typeGraph: TypeGraph) {
  //   const { vertices } = typeGraph
  //
  //   return vertices
  // }
}
