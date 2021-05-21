import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class AtomTypeInput {
  @Field(() => ID)
  declare id: string
}
