import { Field, ObjectType } from '@nestjs/graphql'
import { Page } from '../../../../page/src/core/domain/Page'
import { Style } from '../../../../style/src/core/domain/Style'

@ObjectType('App')
export class App {
  @Field()
  declare id: string

  @Field()
  declare title: string

  @Field(() => [Page], { defaultValue: [] })
  declare pages: Array<Page>

  @Field(() => [Style])
  declare styles: Array<Style>
}
