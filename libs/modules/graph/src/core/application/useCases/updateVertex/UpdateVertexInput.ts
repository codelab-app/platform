import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class UpdateVertexInput {
  @Field()
  declare vertexId: string

  @Field(() => String)
  declare type?: VertexType

  @Field(() => GraphQLJSONObject)
  declare props?: object
}
