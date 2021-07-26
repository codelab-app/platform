import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdaInput {
  @Field()
  declare lambdaId: string
}
