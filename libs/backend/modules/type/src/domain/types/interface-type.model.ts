import { DgraphField } from '@codelab/backend/infra'
import { IInterfaceTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { Field } from '../field.model'
import { TypeGraph } from '../type-graph'
import { Type } from './type.model'

/**
 * The fields of the interface are represented by TypeEdges of kind Field in the TypeGraph
 */
@ObjectType({
  implements: () => [Type],
})
export class InterfaceType
  implements Type<TypeKind.InterfaceType>, IInterfaceTypeVertex
{
  __typename = TypeKind.InterfaceType as const

  declare id: string

  declare name: string

  typeKind: TypeKind.InterfaceType = TypeKind.InterfaceType

  @GraphqlField(() => [Field])
  declare fields: Array<DgraphField>

  // @GraphqlField(() => TypeGraph, { nullable: true })
  declare typeGraph?: TypeGraph

  constructor({
    id,
    name,
    fields,
  }: Pick<InterfaceType, 'id' | 'name' | 'fields'>) {
    this.id = id
    this.name = name
    this.fields = fields
  }
}
