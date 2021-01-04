import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAppRequest {
  @Field()
  declare title: string

  declare userId: string
}
