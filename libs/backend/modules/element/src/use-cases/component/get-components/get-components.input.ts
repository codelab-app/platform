import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetComponentsInput {
  @Field(() => [String], { nullable: true })
  declare componentIds?: Array<string>
}
