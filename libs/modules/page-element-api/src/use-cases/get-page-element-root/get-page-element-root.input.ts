import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageElementRootInput {
  @Field()
  declare pageElementId: string
}
