import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class UpdateEdgeRequest {
  @Field()
  declare id: string

  @Field({ nullable: true })
  declare source: string

  @Field({ nullable: true })
  declare target: string

  @Field((returns) => GraphQLJSONObject, { nullable: true })
  declare props?: any
}
