import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType()
@Directive('@key(fields: "id")')
export class Prop {
  @Field((type) => ID)
  declare id: number

  @Field(() => GraphQLJSONObject)
  declare values: object
}
