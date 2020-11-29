import { Field, InterfaceType } from '@nestjs/graphql'
import { EdgeEntity } from '../../../database/typeorm/models/Edge'
import { UserEntity } from '../../../database/typeorm/models/User'
import { VertexEntity } from '../../../database/typeorm/models/Vertex'

@InterfaceType()
export abstract class IGraph {
  @Field()
  declare id: string

  @Field((returns) => [VertexEntity], { nullable: true })
  declare vertices: Array<VertexEntity>

  @Field((returns) => [EdgeEntity], { nullable: true })
  declare edges: Array<EdgeEntity>

  @Field((returns) => UserEntity, { nullable: true })
  declare user: UserEntity
}
