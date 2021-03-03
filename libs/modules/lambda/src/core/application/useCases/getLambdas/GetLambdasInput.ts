import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasInput {
  @Field()
  declare appId: string
}
