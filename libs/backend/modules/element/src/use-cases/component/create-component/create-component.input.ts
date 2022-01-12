import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateComponentInput {
  @Field({ nullable: true })
  declare name?: string

  @Field(() => String, { nullable: true })
  declare props?: string

  @Field(() => String, { nullable: true })
  declare atomId?: string
}
