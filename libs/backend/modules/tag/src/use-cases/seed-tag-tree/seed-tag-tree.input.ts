import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SeedTagTreeInput {
  @Field()
  declare name: string
}
