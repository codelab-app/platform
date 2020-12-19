import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType()
export class EdgeUseCaseDto {
  @Field({ nullable: true })
  public declare id?: string

  @Field()
  public declare source: string

  @Field()
  public declare target: string

  @Field((returns) => GraphQLJSONObject)
  public declare props: any
}
