import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class User {
  @Field({ nullable: true })
  declare id: string

  @Field({ defaultValue: '' })
  declare email: string

  @Field({ defaultValue: '' })
  declare accessToken?: string
}
