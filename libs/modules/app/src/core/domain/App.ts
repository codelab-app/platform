import { Field, ObjectType } from '@nestjs/graphql'
import { Page } from '../../../../page/src/core/domain/Page'
import { Style } from '../../../../style/src/core/domain/Style'
import { Lambda } from '@codelab/modules/lambda'

@ObjectType('App')
export class App {
  @Field()
  declare id: string

  @Field()
  declare title: string

  @Field(() => [Page], { defaultValue: [] })
  declare pages: Array<Page>

  @Field(() => [Style], { defaultValue: [] })
  declare styles: Array<Style>

  @Field(() => [Lambda], { defaultValue: [], nullable: true })
  declare lambdas: Array<Lambda>
}
