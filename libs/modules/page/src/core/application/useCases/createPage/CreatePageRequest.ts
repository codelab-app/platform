import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageRequest {
  @Field()
  declare title: string

  @Field()
  declare appId: string
}
