import { Field, ObjectType } from '@nestjs/graphql'
import { VertexType as PrismaVertexType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'
import { VertexType } from './VertexType'

@ObjectType('Vertex')
export class Vertex {
  @Field({ nullable: true })
  declare id: string

  @Field(() => VertexType)
  declare type?: PrismaVertexType

  @Field(() => GraphQLJSONObject)
  declare props?: object

  declare parent?: string
}
