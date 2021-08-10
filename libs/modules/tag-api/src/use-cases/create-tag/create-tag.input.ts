import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTagInput {
  @Field()
  declare name: string

  @Field({ nullable: true })
  declare parentTagId?: string

  // @Field(() => Int, {
  //   nullable: true,
  //   description:
  //     'Leave it out to automatically set it as the last order of all the children',
  // })
  // declare order?: number | null
}
