import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageRootInput {
  @Field()
  declare pageId: string
}
