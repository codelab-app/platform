import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetVertexByIdRequest {
  @Field()
  declare id: string
}
