import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetFieldsByTypeInput {
  @Field()
  declare typeId: string
}
