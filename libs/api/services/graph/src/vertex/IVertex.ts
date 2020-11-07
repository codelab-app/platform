import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InterfaceType()
export abstract class IVertex {
  @Field((type) => Int)
  id?: number

  @Field((returns) => GraphQLJSONObject, { nullable: true })
  declare props?: any
}
