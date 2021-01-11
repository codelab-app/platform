import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteAppInput {
  @Field()
  declare id: string
}
