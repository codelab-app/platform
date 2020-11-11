import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthDto {
  @Field({ nullable: false })
  declare accessToken: string
}
