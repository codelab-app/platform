import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '../../../domain/vertex/vertex-type.codec'

@InputType()
export class UpdateNodeInput {
  @Field()
  declare graphId: string

  @Field()
  declare vertexId: string

  @Field(() => VertexType)
  declare type: VertexType
}
