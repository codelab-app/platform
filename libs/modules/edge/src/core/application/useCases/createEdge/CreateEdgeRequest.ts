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

  @Field()
  declare graph_id: string

  @Field((returns) => GraphQLJSONObject)
  declare props: any
}
