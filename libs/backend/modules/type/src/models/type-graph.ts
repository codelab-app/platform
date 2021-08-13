import { ITypeGraph } from '@codelab/shared/graph'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { TypeEdge } from './type-edge'
import { Type } from './types'

@ObjectType()
export class TypeGraph implements ITypeGraph {
  @GraphqlField(() => [Type])
  declare vertices: Array<Type>

  @GraphqlField(() => [TypeEdge])
  declare edges: Array<TypeEdge>

  constructor(vertices: Array<Type>, edges: Array<TypeEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
