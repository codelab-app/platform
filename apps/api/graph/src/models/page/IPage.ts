import { Field, InterfaceType } from '@nestjs/graphql'
import { CodelabAppEntity } from '../app/codelab-app.entity'
import { GraphEntity } from '../graph/graph.entity'

@InterfaceType()
export abstract class IPage {
  @Field()
  declare id: string

  @Field((returns) => CodelabAppEntity, { nullable: true })
  declare app: CodelabAppEntity

  @Field((returns) => [GraphEntity], { nullable: true })
  declare graphs: Array<GraphEntity>
}
