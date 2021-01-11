import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageDto {
  @Field()
  declare id: string

  @Field()
  declare title: string
}
