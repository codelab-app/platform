import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeDto } from './EdgeDto'
import { VertexDto } from './VertexDto'

@ObjectType('Graph')
export class GraphDto {
  @Field({ nullable: true })
  declare id?: string

  @Field()
  public declare label: string

  @Field(() => [VertexDto])
  declare vertices?: Array<VertexDto>

  @Field(() => [EdgeDto])
  declare edges?: Array<EdgeDto>
}
