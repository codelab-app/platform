import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'
@ObjectType('Edge')
export class Edge {
  @Field()
  declare id: string

  @Field()
  declare source: string

  @Field(() => String)
  declare type: EdgeType

  @Field()
  declare target: string

  @Field(() => GraphQLJSONObject)
  declare props: object

  @Field()
  declare order: number
}
