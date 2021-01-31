import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'

@InputType()
export class UpdateVertexInput {
  @Field()
  declare vertexId: string

  @Field(() => String)
  declare type?: VertexType
}
