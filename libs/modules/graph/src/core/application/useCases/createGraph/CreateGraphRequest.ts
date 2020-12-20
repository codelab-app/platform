import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGraphRequest {
  @Field()
  declare label?: string
}
