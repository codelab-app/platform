import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class UserDto {
  @Field()
  declare id?: string

  @Field({ defaultValue: '' })
  declare email: string

  @Field({ defaultValue: '' })
  declare accessToken: string
}
