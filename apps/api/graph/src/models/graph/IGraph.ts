import { Field, InterfaceType } from '@nestjs/graphql'
import { CodelabAppEntity } from '../app/codelab-app.entity'
import { EdgeEntity } from '../edge/edge.entity'
import { PageEntity } from '../page/page.entity'
import { VertexEntity } from '../vertex/vertex.entity'

@InterfaceType()
export abstract class IGraph {
  @Field()
  declare id: string

  @Field((returns) => [VertexEntity], { nullable: true })
  declare vertices: Array<VertexEntity>

  @Field((returns) => [EdgeEntity], { nullable: true })
  declare edges: Array<EdgeEntity>

  @Field((returns) => CodelabAppEntity, { nullable: true })
  declare app: CodelabAppEntity

  @Field((returns) => PageEntity, { nullable: true })
  declare page: PageEntity
}
