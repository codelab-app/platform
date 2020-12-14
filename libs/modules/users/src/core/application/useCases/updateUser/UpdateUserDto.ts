import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpdateUserDto {
  @Field()
  declare affectedRows: number
}
