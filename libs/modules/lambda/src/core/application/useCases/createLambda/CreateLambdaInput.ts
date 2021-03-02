import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLambdaInput {
  @Field()
  declare name: string

  @Field()
  declare body: string

  @Field()
  declare appId: string
}
