import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

@ObjectType('Vertex')
export class Vertex {
  @Field()
  declare id: string

  @Field(() => NodeType)
  declare type?: NodeType

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object

  declare parent?: string
}
