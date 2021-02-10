import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class CreateStyleInput {
  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
