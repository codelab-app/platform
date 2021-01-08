import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageUseCaseDto {
  @Field()
  declare id: string

  @Field()
  declare title: string
}
