import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Page')
export class PageDto {
  @Field({ nullable: true })
  declare id?: string

  @Field()
  declare title: string
}
