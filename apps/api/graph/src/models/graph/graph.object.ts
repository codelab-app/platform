import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeEntity } from '../edge'
import { VertexEntity } from '../vertex'

@ObjectType()
export class GraphObject {
  @Field((returns) => [VertexEntity], { nullable: true })
  declare vertices: Array<VertexEntity>

  @Field((returns) => [EdgeEntity], { nullable: true })
  declare edges: Array<EdgeEntity>
}
