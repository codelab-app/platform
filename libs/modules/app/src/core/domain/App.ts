import { Field, ObjectType } from '@nestjs/graphql'
import { Page } from '../../../../page/src/core/domain/Page'

@ObjectType('App')
export class App {
  @Field()
  declare id: string

  @Field()
  declare title: string

  @Field(() => [Page], { defaultValue: [] })
  declare pages: Array<Page>
}
