import { supportsResultCaching } from '@apollo/client/cache/inmemory/entityStore'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTagInput {
  @Field()
  declare name: string

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Parent tag id, empty parent means it's root",
  })
  declare parent?: string | null

  // @Field({
  //   nullable: true,
  //   defaultValue: false,
  //   description:
  //     'We can create multiple tag trees, the root tells us whether this is a separate tree',
  // })
  // declare isRoot?: boolean
}
