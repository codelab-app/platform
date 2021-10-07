import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUnionType {
  @Field(() => [String])
  declare typeIdsOfUnionType: Array<string>
}
