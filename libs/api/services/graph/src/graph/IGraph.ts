import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { EdgeEntity, VertexEntity } from '@codelab/api/services/graph'
import { UserEntity } from '@codelab/api/services/user'

@InterfaceType()
export abstract class IGraph {
  @Field((type) => Int)
  declare id: number

  @Field((returns) => VertexEntity, { nullable: true })
  declare vertex: VertexEntity

  @Field((returns) => EdgeEntity, { nullable: true })
  declare edge: EdgeEntity

  @Field((returns) => UserEntity, { nullable: true })
  declare user: UserEntity
}
