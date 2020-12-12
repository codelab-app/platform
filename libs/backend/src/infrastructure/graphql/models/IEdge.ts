import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InterfaceType()
export abstract class IEdge {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare source: string

  @Field({ nullable: false })
  declare target: string

  @Field(() => Int)
  declare order: number

  @Field((returns) => GraphQLJSONObject, { nullable: true })
  declare props?: any
}
