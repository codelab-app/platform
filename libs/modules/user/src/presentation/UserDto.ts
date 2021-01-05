import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class UserDto {
  @Field()
  public declare id: string

  @Field()
  public declare email: string

  @Field({ nullable: true })
  public declare accessToken?: string
}
