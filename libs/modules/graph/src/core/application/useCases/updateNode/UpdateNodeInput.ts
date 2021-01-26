import { Field, InputType } from '@nestjs/graphql'
import {
  VertexType,
  VertexTypeC,
} from '../../../domain/vertex/vertex-type.codec'

@InputType()
export class UpdateNodeInput {
  @Field()
  declare graphId: string

  @Field()
  declare vertexId: string

  @Field(() => VertexType)
  declare type: VertexTypeC
}
