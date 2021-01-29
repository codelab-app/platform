import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { EdgeType } from './EdgeType'

registerEnumType(EdgeType, {
  name: 'EdgeType',
})

@ObjectType('Edge')
export class Edge {
  @Field()
  declare id: string

  @Field()
  declare source: string

  @Field(() => EdgeType)
  declare type: EdgeType

  @Field()
  declare target: string

  @Field(() => GraphQLJSONObject)
  declare props: any

  @Field()
  declare order: number
}
