import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('App')
export class AppDto {
  @Field(() => String, { defaultValue: '' })
  declare id: string

  @Field(() => String, { defaultValue: '' })
  declare title: string
}
