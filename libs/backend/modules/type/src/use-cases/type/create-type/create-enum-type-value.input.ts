import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEnumTypeValueInput {
  @Field(() => String, { nullable: true })
  declare name?: string | null

  @Field()
  declare value: string
}
