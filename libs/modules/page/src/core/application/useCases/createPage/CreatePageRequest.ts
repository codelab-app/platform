import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageRequest {
  @Field()
  declare demo: string
}
