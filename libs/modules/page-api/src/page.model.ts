import { App } from '@codelab/modules/app-api'
import { PageElementRoot } from '@codelab/modules/page-element-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Page {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => App)
  declare app: App

  @Field(() => PageElementRoot)
  declare rootElement: PageElementRoot
}
