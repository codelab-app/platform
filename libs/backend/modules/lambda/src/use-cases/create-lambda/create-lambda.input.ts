import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLambdaInput {
  @Field({ description: 'Name of the Lambda function to be executed' })
  declare name: string

  @Field({ description: 'Content of the Lambda function' })
  declare body: string
}
