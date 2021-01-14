import { Field, ObjectType } from '@nestjs/graphql'
import { TypeOrmApp } from '@codelab/backend'

@ObjectType('App', { implements: () => TypeOrmApp })
export class AppDto {
  @Field()
  declare id: string

  @Field()
  declare title: string
}
