import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLambdaInput {
  @Field()
  declare name: string
}
