import { Field, InputType } from '@nestjs/graphql'
import { CreateLambdaInput } from '../create-lambda'

@InputType()
export class UpdateLambdaInput extends CreateLambdaInput {
  @Field()
  declare id: string
}
