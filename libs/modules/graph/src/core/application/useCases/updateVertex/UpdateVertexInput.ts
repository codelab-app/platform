import { Field, InputType } from '@nestjs/graphql'
import { NodeType } from '@codelab/backend'

@InputType()
export class UpdateVertexInput {
  @Field()
  declare vertexId: string

  @Field(() => NodeType)
  declare type?: NodeType
}
