import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { VertexType } from './VertexType'

@InputType()
export class UpdateNodeVertexType {
  @Field()
  declare id: string

  @Field(() => VertexType)
  declare type: VertexType

  @Field(() => GraphQLJSONObject)
  declare props: any
}
