import { Edge, Graph } from '@codelab/backend/abstract/types'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { TypeEdge } from './type-edge'
import { Type } from './types'

@ObjectType()
export class TypeGraph implements Graph<Type, Edge> {
  @GraphqlField(() => [Type])
  declare vertices: Array<Type>

  @GraphqlField(() => [TypeEdge])
  declare edges: Array<TypeEdge>

  constructor(vertices: Array<Type>, edges: Array<TypeEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
