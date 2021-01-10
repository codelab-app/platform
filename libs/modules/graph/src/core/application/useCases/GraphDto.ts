import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeDto } from './EdgeDto'
import { VertexDto } from './VertexDto'

@ObjectType()
export class GraphDto {
  @Field({ nullable: true })
  public declare id?: string

  @Field({ nullable: true })
  public declare label?: string

  @Field((returns) => [VertexDto])
  declare vertices: Array<VertexDto>

  @Field((returns) => [EdgeDto])
  declare edges: Array<EdgeDto>
}
