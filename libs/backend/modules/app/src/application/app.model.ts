import { IApp } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class App implements Omit<IApp, 'pages'> {
  @Field(() => ID)
  declare id: string

  // References User.id
  @Field()
  declare ownerId: string

  @Field()
  declare name: string
}
