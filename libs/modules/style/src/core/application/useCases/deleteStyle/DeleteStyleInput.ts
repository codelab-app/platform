import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteStyleInput {
  @Field()
  declare styleId: string
}
