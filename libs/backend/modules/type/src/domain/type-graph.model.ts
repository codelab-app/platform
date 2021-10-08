import { IType, ITypeEdge, ITypeGraph } from '@codelab/shared/abstract/core'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { TypeEdge } from './type-edge.model'
import { TypeVertex } from './types'

@ObjectType()
export class TypeGraph implements ITypeGraph {
  @GraphqlField(() => [TypeVertex])
  declare vertices: Array<IType>

  @GraphqlField(() => [TypeEdge])
  declare edges: Array<ITypeEdge>

  constructor(vertices: Array<IType>, edges: Array<ITypeEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
