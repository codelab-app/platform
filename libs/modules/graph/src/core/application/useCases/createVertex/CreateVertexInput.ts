import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class CreateVertexInput {
  @Field(() => String)
  declare type: VertexType

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
