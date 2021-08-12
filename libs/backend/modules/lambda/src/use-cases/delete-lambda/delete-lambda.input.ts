import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteLambdaInput {
  @Field()
  declare lambdaId: string
}
