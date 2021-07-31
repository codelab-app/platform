import { Field, InputType } from '@nestjs/graphql'
import { CreateLambdaInput } from '../create-lambda/create-lambda.input'

@InputType()
export class UpdateLambdaInput extends CreateLambdaInput {
  @Field()
  declare id: string
}
