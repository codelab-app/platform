import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetStylesInput {
  @Field()
  declare appId: string
}
