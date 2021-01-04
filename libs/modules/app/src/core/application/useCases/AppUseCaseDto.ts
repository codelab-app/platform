import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppUseCaseDto {
  @Field()
  declare title: string
}
