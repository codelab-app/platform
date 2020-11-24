import { Field, InterfaceType } from '@nestjs/graphql'
import { GraphEntity } from '../graph/graph.entity'
import { PageEntity } from '../page/page.entity'
import { UserEntity } from '../user/user.entity'

@InterfaceType()
export abstract class IApp {
  @Field()
  declare id: string

  @Field((returns) => UserEntity, { nullable: true })
  declare user: UserEntity

  @Field((returns) => [PageEntity], { nullable: true })
  declare pages: Array<PageEntity>

  @Field((returns) => [GraphEntity], { nullable: true })
  declare graphs: Array<GraphEntity>
}
