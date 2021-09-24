import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetTagGraphsInput {
  @Field()
  declare name: string
}
