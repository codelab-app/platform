import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageOwnerInput {
  @Field()
  declare pageId: string
}
