import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import {
  VertexType,
  VertexTypeC,
} from '../core/domain/vertex/vertex-type.codec'

@InputType()
export class AddChildNodeVertexInput {
  @Field(() => VertexType)
  declare type?: VertexTypeC

  @Field(() => GraphQLJSONObject)
  declare props: object
}
