import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetStyleInput {
  @Field()
  declare styleId: string
}
