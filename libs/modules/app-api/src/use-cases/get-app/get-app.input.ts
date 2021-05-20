import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetAppInput {
  @Field()
  declare appId: string
}
