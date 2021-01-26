import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateAppInput {
  @Field()
  declare id: string

  @Field()
  declare title: string
}
