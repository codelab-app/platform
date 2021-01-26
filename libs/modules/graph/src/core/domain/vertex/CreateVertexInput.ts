import { Field, InputType } from '@nestjs/graphql'
import { VertexType as PrismaVertexType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'
import { VertexType } from './VertexType'

@InputType()
export class CreateVertexInput {
  @Field(() => VertexType)
  declare type?: PrismaVertexType

  @Field(() => GraphQLJSONObject)
  declare props?: object
}
