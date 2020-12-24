import { Field, InterfaceType, registerEnumType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '../../../common/types/NodeTypes'

registerEnumType(NodeType, {
  name: 'NodeType',
})

@InterfaceType()
export abstract class IVertex {
  @Field((type) => String)
  declare id: string

  @Field((returns) => GraphQLJSONObject, { nullable: true })
  declare props?: any

  @Field({ nullable: true })
  declare parent?: string

  @Field((returns) => NodeType)
  declare type: NodeType
}
