import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType('Edge')
export class EdgeDto {
  @Field()
  declare id?: string

  @Field()
  declare source: string

  @Field()
  declare target: string

  @Field(() => GraphQLJSONObject)
  declare props: any

  @Field()
  declare order: number
}
