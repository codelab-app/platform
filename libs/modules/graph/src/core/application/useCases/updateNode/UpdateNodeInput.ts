import { Field, InputType } from '@nestjs/graphql'
import { NodeType } from '@codelab/backend'

@InputType()
export class UpdateNodeInput {
  @Field()
  declare graphId: string

  @Field()
  declare vertexId: string

  @Field(() => NodeType)
  declare type?: NodeType
}
