import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ExecuteLambdaInput {
  @Field()
  declare lambdaId: string
}
