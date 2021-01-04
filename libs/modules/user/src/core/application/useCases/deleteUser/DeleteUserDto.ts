import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteUserDto {
  @Field()
  declare affectedRows: number
}
