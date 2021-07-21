import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateElementInput {
  @Field()
  declare name: string

  @Field({ nullable: true })
  declare atomId?: string

  @Field({ nullable: true })
  declare parentElementId?: string

  @Field(() => Int, {
    nullable: true,
    description:
      'Leave it out to automatically set it as the last order of all the children',
  })
  declare order?: number | null
}
