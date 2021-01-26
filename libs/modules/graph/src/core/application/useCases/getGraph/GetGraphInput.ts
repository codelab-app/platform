import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetGraphInput {
  @Field({ nullable: true })
  declare id?: string
}
