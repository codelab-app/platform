import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTagInput {
  @Field()
  declare name: string

  @Field({ nullable: true })
  declare parentTagId?: string

  @Field({
    nullable: true,
    defaultValue: false,
    description:
      'We can create multiple tag trees, the root tells us whether this is a separate tree',
  })
  declare isRoot?: boolean
}
