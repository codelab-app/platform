import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { Enum } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class CreateVertexInput {
  @Field(() => String)
  @Enum(VertexType)
  declare type: VertexType

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
