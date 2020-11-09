import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { EdgeEntity } from '../edge/edge.entity'
import { UserEntity } from '../user/user.entity'
import { VertexEntity } from '../vertex/vertex.entity'

@InterfaceType()
export abstract class IGraph {
  @Field((type) => Int)
  declare id: number

  @Field((returns) => [VertexEntity], { nullable: true })
  declare vertices: Array<VertexEntity>

  @Field((returns) => [EdgeEntity], { nullable: true })
  declare edges: Array<EdgeEntity>

  @Field((returns) => UserEntity, { nullable: true })
  declare user: UserEntity
}
