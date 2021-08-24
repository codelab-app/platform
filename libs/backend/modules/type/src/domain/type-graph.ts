import { ITypeGraph } from '@codelab/shared/abstract/core'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { TypeEdge } from './type-edge'
import { TypeVertex } from './types'

@ObjectType()
export class TypeGraph implements ITypeGraph {
  @GraphqlField(() => [TypeVertex])
  declare vertices: Array<TypeVertex>

  @GraphqlField(() => [TypeEdge])
  declare edges: Array<TypeEdge>

  constructor(vertices: Array<TypeVertex>, edges: Array<TypeEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
