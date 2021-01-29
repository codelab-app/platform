import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetVertexInput {
  @Field()
  declare id: string
}
