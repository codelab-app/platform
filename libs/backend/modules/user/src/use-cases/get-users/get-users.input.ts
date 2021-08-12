import { Field, InputType, Int } from '@nestjs/graphql'
import { GetUsersData } from 'auth0'

@InputType()
export class GetUsersInput implements GetUsersData {
  @Field(() => Int)
  declare page: number

  @Field(() => Int)
  declare perPage: number

  @Field()
  declare query: string

  @Field()
  declare sort: string
}
