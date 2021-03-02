import { Field, InputType } from '@nestjs/graphql'
import { CreateLambdaInput } from '../createLambda/CreateLambdaInput'

@InputType()
export class UpdateLambdaInput extends CreateLambdaInput {
  @Field()
  declare lambdaId: string
}
