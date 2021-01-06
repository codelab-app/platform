import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('App')
export class AppDto {
  @Field()
  declare title: string
}
