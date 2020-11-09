import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { EdgeEntity } from '../edge'
import { UserEntity } from '../user'
import { VertexEntity } from '../vertex'

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
