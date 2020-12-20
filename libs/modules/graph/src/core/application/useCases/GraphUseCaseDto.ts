import { Field, ObjectType } from '@nestjs/graphql'
import { EdgeUseCaseDto } from '../../../../../edge/src/core/application/useCases/EdgeUseCaseDto'
import { VertexUseCaseDto } from '../../../../../vertex/src/core/application/useCases/VertexUseCaseDto'

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
