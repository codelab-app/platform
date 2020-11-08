import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeEntity, VertexEntity } from '@codelab/api/services/graph'

@ObjectType()
export class GraphObject {
  @Field((returns) => [VertexEntity], { nullable: true })
  declare vertices: Array<VertexEntity>

  @Field((returns) => [EdgeEntity], { nullable: true })
  declare edges: Array<EdgeEntity>
}
