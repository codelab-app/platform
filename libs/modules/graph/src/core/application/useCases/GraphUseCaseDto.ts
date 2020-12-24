import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeUseCaseDto } from './EdgeUseCaseDto'
import { VertexUseCaseDto } from './VertexUseCaseDto'

@ObjectType()
export class GraphUseCaseDto {
  @Field({ nullable: true })
  public declare id?: string

  @Field({ nullable: true })
  public declare label?: string

  @Field((returns) => [VertexUseCaseDto])
  declare vertices: Array<VertexUseCaseDto>

  @Field((returns) => [EdgeUseCaseDto])
  declare edges: Array<EdgeUseCaseDto>
}
