import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPagesInput {
  @Field()
  declare appId: string
}
