import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class UpdateStyleInput {
  @Field()
  declare styleId: string

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
