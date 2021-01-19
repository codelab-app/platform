import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('App')
export class AppDto {
  @Field({ nullable: true })
  declare id?: string

  @Field()
  declare title: string
}
