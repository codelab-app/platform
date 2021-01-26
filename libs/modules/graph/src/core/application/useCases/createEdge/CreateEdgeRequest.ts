import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class CreateEdgeRequest {
  @Field({ nullable: true })
  declare id?: string

  @Field()
  declare source: string

  @Field()
  declare target: string

  @Field({ nullable: true })
  declare graphId?: string

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: any
}
